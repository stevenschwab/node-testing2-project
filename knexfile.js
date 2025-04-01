const common = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  // Development environment
  development: {
    ...common,
    connection: {
      filename: './data/dev.db3' // SQLite database file for development
    }
  },

  // Testing environment
  testing: {
    ...common,
    connection: {
      filename: './data/test.db3' // Separate SQLite database file for testing
    }
  }
};