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

    describe('getUserById(id)', () => {
        test.todo('can find a user by id')
    })

    describe('createUser(username, email)', () => {
        it('inserts provided user into db', async () => {
            await User.createUser('schwabs', 'steven.schwab1@gmail.com')
            let users = await User.getAllUsers()
            expect(users).toHaveLength(1)

            await User.createUser('hcraven', 'hcraven7@gmail.com')
            users = await User.getAllUsers()
            expect(users).toHaveLength(2)
        })

        it('gives back the inserted user', async () => {
            let user = await User.createUser('schwabs', 'steven.schwab1@gmail.com')
            expect(user).toMatchObject({ id: 1, username: 'schwabs', email: 'steven.schwab1@gmail.com' })
            user = await User.createUser('gaffer', 'sam@gmail.com')
            expect(user).toMatchObject({ id: 2, username: 'gaffer', email: 'sam@gmail.com'})
        })
    })

    describe('updateUser(id, username, email)', () => {
        test.todo('updates the user')
    })

    describe('deleteUserById(id)', () => {
        test.todo('deletes the user')
    })
})