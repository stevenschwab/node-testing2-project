const express = require('express');
const User = require('./users/users-model.js');
const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/users', async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = server;