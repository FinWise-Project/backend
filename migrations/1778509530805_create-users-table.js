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
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR',
      notNull: true,
      primaryKey: true
    },
    name: {
      type: 'VARCHAR',
      notNull: true
    },
    email: {
      type: 'VARCHAR',
      notNull: true,
      unique: true
    },
    password: {
      type: 'VARCHAR',
      notNull: true
    },
    phone: {
      type: 'VARCHAR',
      notNull: true
    },
    avatar_initials: {
      type: 'VARCHAR',
      notNull: true
    },
    plan: {
      type: 'VARCHAR',
      notNull: true,
      default: 'free'
    },
    currency: {
      type: 'VARCHAR',
      notNull: true,
      default: 'IDR'
    },
    is_active: {
      type: 'BOOLEAN',
      notNull: true,
      default: true
    },
    role: {
      type: 'VARCHAR',
      notNull: true,
      default: 'user'
    },
    created_at: {
      type: 'VARCHAR',
      notNull: true,
    },
    updated_at: {
      type: 'VARCHAR',
      notNull: true,
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('users');
};
