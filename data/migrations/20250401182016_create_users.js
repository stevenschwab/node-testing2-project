
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('id').primary(); // Auto-incrementing ID as primary key
        tbl.string('username').notNullable(); // Username column, required
        tbl.string('email').unique().notNullable(); // Email column, unique and required
        tbl.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp with default current time
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users'); // Reverts by dropping the table
};
