const db = require('../../data/db-config.js')

module.exports = {
    getAllUsers
}

async function getAllUsers() {
    return db('users').select('*')
}