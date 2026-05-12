import { nanoid } from 'nanoid';
import { pool } from '../../../database/pool.js';

class CategoryRepositories {
  async createCategory({ userId, name }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `
        INSERT INTO categories(id, name, created_at, updated_at, created_by) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING id, name
      `,
      values: [id, name, createdAt, updatedAt, userId],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  async verifyNewCategory(name) {
    const query = {
      text: `
        SELECT name
        FROM categories
        WHERE name = $1
      `,
      values: [name],
    };

    const result = await pool.query(query);
    return result.rows.length > 0;
  }

  async getCategory() {
    const query = {
      text: `
      SELECT id, name
      FROM categories
      `,
    };

    const result = await pool.query(query);
    return result.rows;
  };

  async getCategoryById(id) {
    const query = {
      text: `
        SELECT id, name 
        FROM categories 
        WHERE id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  async editCategory({ id, name }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `
        UPDATE categories 
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

  async deleteCategory(id) {
    const query = {
      text: `
        DELETE FROM categories 
        WHERE id = $1 
        RETURNING id
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

export default new CategoryRepositories();