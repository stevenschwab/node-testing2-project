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
        it('responds with 200 OK', async () => {
            await User.createUser(Sam)
            const res = await request(server).get('/users/1')
            expect(res.status).toBe(200)
        })
        it('responds with the user with the given id', async () => {
            await User.createUser(Sam)
            let res = await request(server).get('/users/1')
            expect(res.body).toMatchObject(Sam)
        })
        it('responds with a 404 if id not in db', async () => {
            const res = await request(server).get('/users/2')
            expect(res.status).toBe(404)
        })
        it('responds with error message [User not found] if id not in db', async () => {
            const res = await request(server).get('/users/1')
            expect(res.body.error).toBe('User not found')
        })
    })

    describe('[POST] /users', () => {
        it('responds with 201', async () => {
            let res = await request(server).post('/users').send(Sam)
            expect(res.status).toBe(201)
        })
        it('returns the newly created user', async () => {
            let res = await request(server).post('/users').send(Sam)
            expect(res.body.id).toBe(1)
            expect(res.body.username).toBe('Sam')
            expect(res.body.email).toBe('sam@gmail.com')
        })
        it('responds with 400 if username empty', async () => {
            let res = await request(server).post('/users').send({ username: '', email: 'sam@gmail.com' })
            expect(res.status).toBe(400)
        })
        it('responds with 400 if email empty', async () => {
            let res = await request(server).post('/users').send({ username: 'sam', email: '' })
            expect(res.status).toBe(400)
        })
        it('responds with 400 if username and email are empty', async () => {
            let res = await request(server).post('/users').send({ username: '', email: '' })
            expect(res.status).toBe(400)
        })
        it('responds with error message if username or email are empty', async () => {
            let res = await request(server).post('/users').send({ username: '', email: '' })
            expect(res.body.error).toBe('Username and email are required')
        })
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