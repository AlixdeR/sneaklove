const express = require("express");
const router = express.Router();
const tagModel = require("../models/Tag");
const sneakerModel = require("../models/Sneaker");
const userModel = require("../models/User");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res) => {
  Promise.all([tagModel.find(), sneakerModel.find()])
  .then(dbRes => {
    console.log(dbRes)
    res.render("products", {tags:dbRes[0], sneakers:dbRes[1]});
  })
  .catch(err => console.log("error while load sneakers", err))
});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product", sneaker);
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
