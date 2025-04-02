const User = require('./users-model.js')
const db = require('../../data/db-config.js')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('users').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('users model', () => {
    describe('getAll()', () => {
        it('gets empty list when no users in db', async () => {
            const users = await User.getAllUsers()
            expect(users).toHaveLength(0)
        })
    })
})