const tagModel = require("../models/Tag")
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/sneaklove', {
        useNewUrlParser: true
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

const tags = [
    {name: "loose"},
    {name: "sporty"},
    {name: "smart"},
    {name: "urban"}
];

tagModel
    .insertMany(tags)
    .then(dbSuccess => {
        console.log("tags inserted successfully", dbSuccess)
    })
    .catch(dbErr => {
        console.log("oh no, error connecting to mongo", dbErr)
    });

module.exports = tags;