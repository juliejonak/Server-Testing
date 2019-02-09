const express = require('express');
const db = require('../rebelgirls/rebelgirlsModel');
const server = express();
server.use(express.json());

server.get('/', async (req, res) => {

})

server.get('/:id', async (req, res) => {

})

server.post('/', (req, res) => {
    const girl = req.body;

    if(girl.name && girl.occupation){
        db.insert(girl)
            .then(res => {
                res.status(201).json(posted)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error adding this Rebel Girl."
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
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'This Rebel Girl is too fierce to erase from history.'
                    })
                })
        })
        .catch(err => {
            res.status(404).json({
                message: "That doesn't seem to be a real Rebel Girl. Try again?"
            })
        })
})

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