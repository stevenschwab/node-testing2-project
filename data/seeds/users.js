
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'alice', email: 'alice@example.com' },
        { username: 'bob', email: 'bob@example.com' },
        { username: 'charlie', email: 'charlie@example.com' },
      ]);
    });
};
