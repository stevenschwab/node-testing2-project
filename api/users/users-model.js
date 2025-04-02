const db = require('../../data/db-config.js')

module.exports = {
    getAllUsers
}

// GET /users - Fetch all users
async function getAllUsers() {
    return db('users').select('*')
}