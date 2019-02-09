const rebelgirls = require('./rebelgirlsModel');
const db = require('../data/dbConfig.js');

describe('the rebel girls model', () => {

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


    it('should fetch all the rebel girls', async () => {
        const girls = await rebelgirls.fetch()

        expect(girls.length).toBe(4)
        
    })

    it('should fetch a rebel girl by id', async () => {
        const girls = await rebelgirls.fetch(1)

        expect(girls.name).toBe(`Grace O'Malley`)

    })

    it('should add a new rebel girl', async () => {
        const girls = await rebelgirls.insert({
            name: 'Misty Copeland',
            occupation: "Ballerina"
        })

        expect(girls.id).toBe(5);
    })

    it('should delete an existing rebel girl by id', async () => {
        const deletion = await rebelgirls.remove(1);

        expect(deletion.id).toBe(1);
    })

})