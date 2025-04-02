const request = require('supertest')
const db = require('../data/db-config')
const server = require('./server.js')

beforeAll(async () => {
    await db.migrate.rollback() // so any changes to migration files are picked up
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('users').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('server.js', () => {
    it('should set testing environment', () => {
        expect(process.env.NODE_ENV).toBe('testing')
    })
})