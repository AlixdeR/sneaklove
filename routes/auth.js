const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcryptjs = require("bcryptjs");

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next) => {
    const user = req.body;
    console.log(user);
    if (!user.email || !user.password || !user.name || !user.lastname) {
        req.flash("error", "no empty fields here please");
        res.redirect("/auth/signup");
        return;
    } else {
        userModel
            .findOne({
                email: user.email
            })
            .then(dbRes => {
                if (dbRes) {
                    req.flash("error", "sorry, email is already taken :/");
                    return res.redirect("/auth/signup");
                }

                const salt = bcryptjs.genSaltSync(10);
                const hashed = bcryptjs.hashSync(user.password, salt);
                user.password = hashed;

                userModel.create(user).then(() => res.redirect("/auth/signin"));
            })
            .catch(next);
    }
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signin", (req, res, next) => {
    const user = req.body;
  
    if (!user.email || !user.password) {
      req.flash("error", "wrong credentials");
      return res.redirect("/auth/signin");
    }
  
    userModel
      .findOne({ email: user.email })
      .then(dbRes => {
        if (!dbRes) {
          req.flash("error", "wrong credentials");
          return res.redirect("/auth/signin");
        }

        if (bcryptjs.compareSync(user.password, dbRes.password)) {
          const { _doc: clone } = { ...dbRes }; 
          delete clone.password;
  
          req.session.currentUser = clone;
          return res.redirect("/dashboard");
        } else {
          req.flash("error", "wrong credentials");
          return res.redirect("/auth/signin");
        }
      })
      .catch(next);
  });

module.exports = router;