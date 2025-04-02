const db = require('../../data/db-config.js')

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUserById
}

// Fetch all users
async function getAllUsers() {
    return db('users').select('*')
}

// Get a user by ID
async function getUserById(id) {
    return db('users').where({ id }).first()
}

// Create a new user
async function createUser(username, email) {
    const [id] = await db('users').insert({ username, email })
    return { id, username, email }
}

// Update a user by id
async function updateUser(id, changes) {
    const updatedRows = await db('users').where({ id }).update(changes)
    if (updatedRows === 0) throw new Error('User not found')
    return db('users').where({ id }).first()
}

// Delete a user by id
async function deleteUserById(id) {
    const deletedRows = await db('users').where({ id }).del()
    if (deletedRows === 0) throw new Error('User not found')
    return { success: true }
}