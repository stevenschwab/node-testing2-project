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
    describe('getAllUsers()', () => {
        it('gets empty list when no users in db', async () => {
            const users = await User.getAllUsers()
            expect(users).toHaveLength(0)
        })

        it('can get a list with all users in db', async () => {
            const username = "david"
            const email = "david@example.com"
            const user = await User.createUser(username, email);
            let users = await User.getAllUsers();
            expect(users).toHaveLength(1);

            await User.createUser("steve", "steven.schwab1@gmail.com");
            users = await User.getAllUsers();
            expect(users).toHaveLength(2);
        });
    })
})