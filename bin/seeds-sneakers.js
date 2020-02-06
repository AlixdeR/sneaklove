const sneakerModel = require("../models/Sneaker")
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

const sneakers = [
    {
        image: "../medias/air-max.png",
        name: "Air Max",
        ref: "air-max",
        sizes: [38, 39, 40, 41, 42, 43],
        description: "Sneakers Air Max",
        price: 120,
        category: ["men", "women"],
        id_tags: ["5e3c1141aecda337745af1c4", "5e3c1141aecda337745af1c5"]
    },

    {
        image: "../medias/stan-smith.webp",
        name: "Stan Smith",
        ref: "stan-smith",
        sizes: [38, 39, 40, 41, 42, 43],
        description: "Sneakers Stan Smith",
        price: 90,
        category: ["men", "women"],
        id_tags: ["5e3c1141aecda337745af1c4", "5e3c1141aecda337745af1c6"]
    },

    {
        image: "../medias/vans-classic.jpeg",
        name: "Vans Classic",
        ref: "vans-classic",
        sizes: [38, 39, 40, 41, 42, 43],
        description: "Sneakers Vans Classic",
        price: 60,
        category: ["men", "women"],
        id_tags: "5e3c1141aecda337745af1c4"
    },
];

sneakerModel
    .insertMany(sneakers)
    .then(dbSuccess => {
        console.log("sneakers inserted successfully", dbSuccess)
    })
    .catch(dbErr => {
        console.log("oh no, error connecting to mongo", dbErr)
    });

module.exports = sneakers;