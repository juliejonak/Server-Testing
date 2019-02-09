const db = require('../data/dbConfig');
require('events').EventEmitter.defaultMaxListeners = 0

const fetch = (id) => {
    if(id){
        return db('rebelgirls').where('id', id)
            .then(rebelgirls => {
                return rebelgirls[0]
            })
    }

    return db('rebelgirls')
        .then(rebelgirls => {
            return rebelgirls
        })
}

const insert = (girl) => {
    return db('rebelgirls').insert(girl)
        .then( ([id]) => fetch(id))
}

const remove = (id) => {
    return db('rebelgirls').where('id', id).del(id)
}

module.exports = {
    fetch, insert, remove 
}