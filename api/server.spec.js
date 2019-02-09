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

    })

    describe('post to /', () => {

    })

    describe('delete /:id', () => {

    })

})


//two tests per route
//test what is being returned

//get all
//get by id
//404 if id doesn't exist
//200 if get is successful


//check that name is unique before posting
//return 400 if not
//201 if post is successful

//for delete, check it exists
//404 if it doesn't
//200 if successful
