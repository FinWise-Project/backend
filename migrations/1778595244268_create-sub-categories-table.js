/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('sub_categories', {
    id: {
      type: 'VARCHAR',
      notNull: true,
      primaryKey: true
    },
    name: {
      type: 'VARCHAR',
      notNull: true,
      unique: true
    },
    category_id: {
      type: 'VARCHAR',
      notNull: true,
      references: 'categories(id)',
      onDelete: 'CASCADE'
    },
    created_at: {
      type: 'VARCHAR',
      notNull: true
    },
    updated_at: {
      type: 'VARCHAR',
      notNull: true
    },
    created_by: {
      type: 'VARCHAR',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE'
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('sub_categories');
};
