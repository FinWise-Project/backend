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
  pgm.createTable('tokens', {
    id: {
      type: 'VARCHAR',
      notNull: true,
      primaryKey: true
    },
    user_id: {
      type: 'VARCHAR',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE'
    },
    token: {
      type: 'VARCHAR',
      notNull: true,
      unique: true
    },
    expired_at: {
      type: 'TIMESTAMP',
      notNull: true
    },
    created_at: {
      type: 'VARCHAR',
      notNull: true
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('tokens');
};
