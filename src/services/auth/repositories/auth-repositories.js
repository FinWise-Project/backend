import { nanoid } from 'nanoid';
import { pool } from '../../../database/pool.js';
import bcrypt from 'bcrypt';
import AuthorizationError from '../../../exceptions/authorization-error.js';

class AuthRepositories {
  async createUser({ name, email, password, phone }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarInitial = name.split(' ').map(initial => initial.charAt(0)).join('');
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `
        INSERT INTO users(id, name, email, password, phone, avatar_initials, created_at, updated_at) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING id
        `,
      values: [id, name, email, hashedPassword, phone, avatarInitial, createdAt, updatedAt],
    };

    const result = await pool.query(query);
    return result.rows[0];
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: `
        SELECT id, password
        FROM users
        WHERE email = $1
      `,
      values: [email],
    };

    const user = await pool.query(query);

    if (!user.rows.length) {
      throw new AuthorizationError('User tidak ditemukan');
    }

    const { id, password: hashedPassword } = user.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      throw new AuthorizationError('Password salah');
    }
    return id;
  }

  async verifyNewUser(username) {
    const query = {
      text: `
        SELECT name
        FROM users
        WHERE name = $1
      `,
      values: [username],
    };

    const result = await pool.query(query);
    return result.rows.length > 0;
  }

  async verifyEmail(email) {
    const query = {
      text: `
        SELECT email
        FROM users
        WHERE email = $1
      `,
      values: [email],
    };

    const result = await pool.query(query);
    return result.rows.length > 0;
  }

  async addRefreshToken({ token, userId, expiredAt }) {
    const id = `refresh-token-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: `
        INSERT INTO tokens(id, token, user_id, expired_at, created_at) 
        VALUES($1, $2, $3, $4, $5)
      `,
      values: [id, token, userId, expiredAt, createdAt],
    };

    await pool.query(query);
  }

  async deleteRefreshToken(token) {
    const query = {
      text: `
        DELETE FROM tokens
        WHERE token = $1
      `,
      values: [token],
    };

    await pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: `
        SELECT token, user_id, expired_at
        FROM tokens
        WHERE token = $1
      `,
      values: [token],
    };

    const result = await pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError('Refresh token tidak valid');
    }

    if (new Date() > new Date(result.rows[0].expired_at)) {
      throw new AuthorizationError('Refresh token telah kedaluwarsa');
    }
    return result.rows[0];
  }
}

export default new AuthRepositories();