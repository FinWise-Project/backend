import { nanoid } from 'nanoid';
import { pool } from '../../../database/pool.js';

class PaymentMethodRepositories {
  async createPaymentMethod({ userId, name }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `
        INSERT INTO payment_methods (id, name, created_at, created_by, updated_at) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING id, name
      `,
      values: [id, name, createdAt, userId, updatedAt],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  async verifyNewPaymentMethod(name) {
    const query = {
      text: `
        SELECT name
        FROM payment_methods 
        WHERE name = $1
      `,
      values: [name],
    };

    const result = await pool.query(query);
    return result.rows.length > 0;
  }

  async getPaymentMethod() {
    const query = {
      text: `
      SELECT id, name
      FROM payment_methods 
      `,
    };

    const result = await pool.query(query);
    return result.rows;
  };

  async getPaymentMethodById(id) {
    const query = {
      text: `
        SELECT id, name 
        FROM payment_methods  
        WHERE id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  async editPaymentMethod({ id, name }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `
        UPDATE payment_methods  
        SET name = $1, 
        updated_at = $2 
        WHERE id = $3
        RETURNING id
      `,
      values: [name, updatedAt, id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }

  async deletePaymentMethod(id) {
    const query = {
      text: `
        DELETE FROM payment_methods  
        WHERE id = $1 
        RETURNING id
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

export default new PaymentMethodRepositories();