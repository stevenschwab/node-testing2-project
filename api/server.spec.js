const request = require('supertest')
const db = require('../data/db-config')
const server = require('./server.js')
const User = require('./users/users-model.js')

const Sam = { username: 'Sam', email: 'sam@gmail.com' }
const Frodo = { username: 'Frodo', email: 'frodo@gmail.com' }

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

    describe('[GET] /', () => {
        it('should return 200 OK', () => {
            // explain that we need to return the call to request()
            // this signals to jest that this test is asynchronous and it needs
            // to wait for the promise to resolve, before running the assertions
            return request(server)
                .get('/')
                .then(res => {
                    // the response object has useful methods we can use
                    expect(res.status).toBe(200)
                })
        })
        // using the squad (async/await) we don't need to return anything
        // jes will wait because of the async function
        it('should return 200 OK using async await', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
        })
        it('should return JSON', async () => {
            const res = await request(server).get('/')
            expect(res.type).toBe('application/json')
        })
        it('should return { api: "up" }', async () => {
            const res = await request(server).get('/')
            expect(res.body).toEqual({ api: 'up' })
        })
        it('[GET] / another way of doing it', () => {
            return request(server)
                .get('/')
                .expect('Content-Type', /json/)
                .expect('Content-Length', '12')
                .expect(200)
        })
    })

    describe('[GET] /users', () => {
        it('responds with 200 OK', async () => {
            const res = await request(server).get('/users')
            expect(res.status).toBe(200)
        })
        it('responds with empty array if no users', async () => {
            const res = await request(server).get('/users')
            expect(res.body).toHaveLength(0)
        })
        it('responds with users if users', async () => {
            await User.createUser(Sam)
            let res = await request(server).get('/users')
            expect(res.body).toHaveLength(1)
            await User.createUser(Frodo)
            res = await request(server).get('/users')
            expect(res.body).toHaveLength(2)
            expect(res.body[0]).toMatchObject(Sam)
            expect(res.body[1]).toMatchObject(Frodo)
        })
    })

    describe('[GET] /users/:id', () => {
        test.todo('responds with 200 OK')
        test.todo('responds with the user with the given id')
        test.todo('responds with a 404 if id not in db')
        test.todo('responds with error message User not found if id not in db')
    })

    describe('[POST] /users', () => {
        test.todo('responds with 201')
        test.todo('returns the newly created user')
        test.todo('responds with 400 if username empty')
        test.todo('responds with 400 if email empty')
        test.todo('responds with 400 if username and email are empty')
        test.todo('responds with error message if username or email are empty')
    })

    describe('[PUT] /users/:id', () => {
        test.todo('responds with 200 OK')
        test.todo('responds with 400 if username or email are empty')
        test.todo('responds with error message [username and email are required] if username or email are empty')
        test.todo('responds with error message [User not found] if user id does not exist')
        test.todo('responds with 404 if user id does not exist')
    })

    describe('[DELETE] /users/:id', () => {
        test.todo('responds with 200 OK')
        test.todo('responds with success message if user deleted successfully')
        test.todo('responds with error message if user id does not exist')
    })
})