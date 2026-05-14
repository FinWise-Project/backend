import { nanoid } from 'nanoid';
import { pool } from '../../../database/pool.js';

class SubCategoryRepositories {
  async createSubCategory({ userId, categoryId, name }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `
        INSERT INTO sub_categories(id, category_id, name, created_at, updated_at, created_by) 
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING id, name
      `,
      values: [id, categoryId, name, createdAt, updatedAt, userId],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  async verifyNewSubCategory(name) {
    const query = {
      text: `
        SELECT name
        FROM sub_categories
        WHERE name = $1
      `,
      values: [name],
    };

    const result = await pool.query(query);
    return result.rows.length > 0;
  }

  async getSubCategory({ categoryName, subCategoryName, categoryId }) {
    const query = {
      text: `
        SELECT 
          sc.id,
          sc.name,
          c.name AS category_name
        FROM sub_categories sc
        JOIN categories c ON sc.category_id = c.id
        WHERE 1=1
      `,
      values: [],
    };

    //filter berdasarkan nama category
    if (categoryName) {
      query.values.push(`%${categoryName.toLowerCase()}%`);
      query.text += ` AND LOWER(c.name) LIKE $${query.values.length}`;
    }

    //optional: filter nama subcategory juga
    if (subCategoryName) {
      query.values.push(`%${subCategoryName.toLowerCase()}%`);
      query.text += ` AND LOWER(sc.name) LIKE $${query.values.length}`;
    }

    // filter berdasarkan id category
    if (categoryId) {
      query.values.push(categoryId);
      query.text += ` AND sc.category_id = $${query.values.length}`;
    }

    // sorting biar rapi
    query.text += ` ORDER BY sc.name ASC`;

    const result = await pool.query(query);
    return result.rows;
  }

  async getSubCategoryById(id) {
    const query = {
      text: `
        SELECT id, name 
        FROM sub_categories 
        WHERE id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  };

  async editSubCategory({ id, name }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `
        UPDATE sub_categories 
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

  async deleteSubCategory(id) {
    const query = {
      text: `
        DELETE FROM sub_categories 
        WHERE id = $1 
        RETURNING id
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

export default new SubCategoryRepositories();