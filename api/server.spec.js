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


})