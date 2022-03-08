const express = require("express");
const { userLogin } = require("../controllers/user.controller");
const session = require("express-session");

const route = express.Router();

/*  req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id); */

// @route post /v1/login
// @desc  login
// @access Public

route.get("/", async (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 0
    })

    res.send({message: 'The user is logged out'})
});

module.exports = route;