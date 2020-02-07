const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");

router.get("/", (req, res) => {
    sneakerModel
        .find()
        .then(sneakers => {
            console.log(sneakers);
            res.render("products_manage", {
                sneakers
            });
        })
        .catch(dbErr => console.log("error loading sneakers on dashboard", dbErr));
});

router.get("/edit/:id", (req, res) => {
    Promise.all([tagModel.find(), sneakerModel.findById(req.params.id)])
        .then(dbRes => {
            res.render("product_edit", {
                sneaker: dbRes[1],
                tags: dbRes[0]
            });
        })
        .catch(dbErr => console.log("error loading sneaker edit on dashboard", dbErr));
})

router.post("/edit/:id", (req, res, next) => {
    const {
        image,
        name,
        ref,
        sizes,
        description,
        price,
        id_tags
    } = req.body;

    var sizesArr = sizes.split(",");
    sizesArr = sizesArr.map(size => Number(size));

    var category = [];
    if (req.body.kids === 'on') {
        category.push("kids");
    }

    if (req.body.men === 'on') {
        category.push("men");
    }

    if (req.body.women === 'on') {
        category.push("women");
    }

    sneakerModel
        .findByIdAndUpdate(req.params.id, {
            image,
            name,
            ref,
            sizesArr,
            description,
            price,
            category,
            id_tags
        })
        .then(() => {
            req.flash("success", "sneaker successfully added");
            res.redirect("/dashboard")
        })
        .catch(next);
});

router.get("/delete/:id", (req, res) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then(dbRes => {
            console.log("delete ok", dbRes);
            res.redirect("/dashboard");
        })
        .catch(dbErr => console.log("error deleting sneaker", dbErr));
});

router.get("/add", (req, res) => {
    tagModel
    .find()
    .then(tags => {
        res.render("products_add", {tags});
    })
    .catch(dbErr => console.log("error loading add sneaker", dbErr));
    
});

router.post("/add", (req, res,next) => {
    const {
        image,
        name,
        ref,
        sizes,
        description,
        price,
        id_tags
    } = req.body;

    var sizesArr = sizes.split(",");
    sizesArr = sizesArr.map(size => Number(size));

    var category = [];
    if (req.body.kids === 'on') {
        category.push("kids");
    }

    if (req.body.men === 'on') {
        category.push("men");
    }

    if (req.body.women === 'on') {
        category.push("women");
    }

    sneakerModel
        .create({
            image,
            name,
            ref,
            sizesArr,
            description,
            price,
            category,
            id_tags
        })
        .then(() => {
            req.flash("success", "sneaker successfully updated");
            res.redirect("/dashboard")
        })
        .catch(next);
});

module.exports = router;