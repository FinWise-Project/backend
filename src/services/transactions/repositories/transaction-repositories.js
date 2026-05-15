import { nanoid } from 'nanoid';
import { pool } from '../../../database/pool.js';

class TransactionRepositories {
  async createTransaction({ date, amount, type, subCategoryId, paymentMethodId, description, userId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `
        INSERT INTO transactions(id, date, amount, type, sub_category_id, payment_method_id, description, created_at, updated_at, created_by) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING id, date, amount, type
      `,
      values: [id, date, amount, type, subCategoryId, paymentMethodId, description, createdAt, updatedAt, userId],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  // async verifyNewCategory(name) {
  //   const query = {
  //     text: `
  //       SELECT name
  //       FROM categories
  //       WHERE name = $1
  //     `,
  //     values: [name],
  //   };

  //   const result = await pool.query(query);
  //   return result.rows.length > 0;
  // }

  async getTransactions({ type, categoryId, categoryName }) {
    const query = {
      text: `
        SELECT 
          t.id,
          t.date,
          t.amount,
          t.type,
          t.description,
          t.created_at,
          sc.name AS subcategory_name,
          c.id   AS category_id,
          c.name AS category_name,
          pm.name AS payment_method_name
        FROM transactions t
        LEFT JOIN sub_categories sc ON t.sub_category_id = sc.id
        LEFT JOIN categories c ON sc.category_id = c.id
        LEFT JOIN payment_methods pm ON t.payment_method_id = pm.id
        WHERE 1=1
      `,
      values: [],
    };

    // filter by type name
    if (type) {
      query.values.push(`%${type.toLowerCase()}%`);
      query.text += ` AND LOWER(t.type) LIKE $${query.values.length}`;
    }

    // filter by category ID
    if (categoryId) {
      query.values.push(categoryId);
      query.text += ` AND c.id = $${query.values.length}`;
    }

    // filter by category name
    if (categoryName) {
      query.values.push(`%${categoryName.toLowerCase()}%`);
      query.text += ` AND LOWER(c.name) LIKE $${query.values.length}`;
    }

    query.text += ` ORDER BY t.date DESC`;

    const result = await pool.query(query);
    return result.rows;
  }

  async getTransactionById(id) {
    const query = {
      text: `
        SELECT 
          t.id,
          t.date,
          t.amount,
          t.type,
          t.description,
          t.created_at,
          sc.name AS subcategory_name,
          c.id   AS category_id,
          c.name AS category_name,
          pm.name AS payment_method_name
        FROM transactions t
        LEFT JOIN sub_categories sc ON t.sub_category_id = sc.id
        LEFT JOIN categories c ON sc.category_id = c.id
        LEFT JOIN payment_methods pm ON t.payment_method_id = pm.id
        WHERE t.id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  async editTransaction({ id, date, amount, type, subCategoryId, paymentMethodId, description }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `
        UPDATE transactions
        SET date = $1, 
        amount = $2, 
        type = $3, 
        sub_category_id = $4, 
        payment_method_id = $5, 
        description = $6, 
        updated_at = $7
        WHERE id = $8
        RETURNING id
      `,
      values: [date, amount, type, subCategoryId, paymentMethodId, description, updatedAt, id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }

  async deleteTransaction(id) {
    const query = {
      text: `
        DELETE FROM transactions
        WHERE id = $1
        RETURNING id
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

export default new TransactionRepositories();