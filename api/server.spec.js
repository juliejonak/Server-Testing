const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe('the route handlers', () => {

    beforeEach( () => {
        knex.migrate.rollback()
            .then( () => {
                knex.migrate.latest()
                    .then( () => {
                        return knex.seed.run()
                    })
            })
    })

    afterEach(async () => {
        await knex.migrate.rollback()
    });


    
    describe('get /', () => {

        it('responds with 200', async () => {
            const response = await request(server).get('/')

            expect(response.status).toBe(200)
        })

        it('sends the correct response', async () => {
            const response = await request(server).get('/')

            expect(response.body.length).toEqual(4)
        })

    })

    describe('get /:id', () => {

        it('responds with 200', async () => {
            const response = await request(server).get('/1')

            expect(response.status).toBe(200)
        })

        it('sends the correct response', async () => {
            const response = await request(server).get('/1')

            expect(response.body.id).toEqual(1)
            expect(response.body.name).toEqual(`Kate O'Malley`)
        })

        it('responds with 404 to invalid id', async () => {
            const response = await request(server).get('/17')

            expect(response.status).toBe(404)
        })

    })

    describe('post to /', () => {

        it('responds with 201', async () => {
            const newGirl = {
                name: "Misty Copeland",
                occupation: "Ballerina"
            }
            const response = await request(server).post('/').send(newGirl)

            expect(response.status).toBe(201)
        })

        it('sends the correct response', async () => {
            const newGirl = {
                name: "Misty Copeland",
                occupation: "Ballerina"
            }
            const response = await request(server).post('/').send(newGirl)

            expect(response.body.id).toEqual(5)
        })

        it('responds with 400 to duplicate name', async () => {
            const newGirl = {
                name: `Kate O'Malley`,
                occupation: "Pirate"
            }
            const response = await request(server).post('/').send(newGirl)

            expect(response.status).toBe(400)
        })

    })

    describe('delete /:id', () => {

        it('responds with 200', async () => {
            const response = await request(server).delete('/1')

            expect(response.status).toBe(200)
        })

        it('sends the correct response', async () => {
            const response = await request(server).delete('/1')

            expect(response.body.id).toEqual(1)
            expect(response.body.name).toEqual(`Kate O'Malley`)
        })

        it('responds with 404 to invalid id', async () => {
            const response = await request(server).delete('/17')

            expect(response.status).toBe(404)
        })

    })

})
