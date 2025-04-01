const express = require('express');
const User = require('./users/users-model.js');
const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' });
});

module.exports = server;