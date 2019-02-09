const express = require('express');
const db = require('../rebelgirls/rebelgirlsModel');
const server = express();
server.use(express.json());

require('events').EventEmitter.defaultMaxListeners = 0

server.get('/', async (req, res) => {
    db.fetch()
        .then(girls => {
            res.json(girls)
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not fetch those Rebel Girls!"
            })
        })
})

server.get('/:id', async (req, res) => {
    const {id} = req.params;
    db.fetch(id)
        .then(girl => {
            if(girl){
            res.json(girl)
            } else{
                res.status(404).json({
                    message: "That Rebel Girl does not yet exist!"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "That Rebel Girl could not be fetched."
            })
        })
})

server.post('/', (req, res) => {
    const girl = req.body;

    if(girl.name && girl.occupation){
        db.insert(girl)
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(400).json({
                    message: "Are you sure this Rebel Girl doesn't already exist?"
                })
            })
    } else if(girl.name){
        res.status(400).json({
            message: "Rebel girls need an occupation."
        })
    } else if(girl.occupation) {
        res.status(400).json({
            message: "Rebel girls need a name."
        })
    } else {
        res.status(400).json({
            message: "Rebel girls need a name and occupation!"
        })
    }
})

server.delete('/:id', async (req, res) => {
    const {id} = req.params;
    db.fetch(id)
        .then(girl => {
            const rebelGirl = girl;
            db.remove(id)
                .then(response => {
                    if(response){
                        res.json(rebelGirl)
                    } else {
                        res.status(404).json({
                            message: "This Rebel Girl does not exist"
                        })
                    }
                })
        })
        .catch(err => {
            res.status(500).json({
                message: 'This Rebel Girl is too fierce to erase from history.'
            })
        })
})

module.exports = server;