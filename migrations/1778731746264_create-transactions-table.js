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
  pgm.createTable('transactions', {
    id: {
      type: 'VARCHAR',
      notNull: true,
      primaryKey: true
    },
    date: {
      type: 'DATE',
      notNull: true,
    },
    amount: {
      type: 'BIGINT',
      notNull: true,
    },
    type: {
      type: 'VARCHAR',
      notNull: true,
    },
    sub_category_id: {
      type: 'VARCHAR',
      notNull: true,
      references: 'sub_categories(id)',
      onDelete: 'CASCADE'
    },
    payment_method_id: {
      type: 'VARCHAR',
      notNull: true,
      references: 'payment_methods(id)',
      onDelete: 'CASCADE'
    },
    description: {
      type: 'TEXT',
      notNull: true
    },
    created_at: {
      type: 'VARCHAR',
      notNull: true
    },
    created_by: {
      type: 'VARCHAR',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE'
    },
    updated_at: {
      type: 'VARCHAR',
      notNull: true
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('transactions');
};
