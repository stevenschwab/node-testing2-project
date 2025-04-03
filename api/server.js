const express = require('express');
const User = require('./users/users-model.js');
const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

// Fetch all users
server.get('/users', async (req, res, next) => {
    try {
        const users = await User.getAllUsers()
        res.json(users)
    } catch (error) {
        next(error)
    }
})

// Fetch a user by ID
server.get('/users/:id', async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.id)
        if (!user) return res.status(404).json({ error: 'User not found'})
        res.json(user)
    } catch (error) {
        next(error)
    }
})

// Create a new user
server.post('/users', async (req, res, next) => {
    try {
        const { username, email } = req.body
        if (!username || !email) {
            return res.status(400).json({ error: 'Username and email are required' })
        }
        const newUser = await User.createUser({ username, email })
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
})

// Update a user
server.put('/users/:id', async (req, res, next) => {
    try {
        const { username, email } = req.body
        if (!username || !email) {
            return res.status(400).json({ error: 'Username and email are required' })
        }
        const updatedUser = await User.updateUser(req.params.id, { username, email })
        res.json(updatedUser)
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ error: 'User not found' });
        }
        next(error)
    }
})

// Delete a user
server.delete('/users/:id', async (req, res, next) => {
    try {
        await User.deleteUserById(req.params.id)
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        next(error)
    }
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;