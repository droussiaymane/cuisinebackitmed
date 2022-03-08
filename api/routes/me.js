const express = require("express");
const session = require("express-session");
// const mongoDBSession = require("connect-mongodb-session")(session);

const route = express.Router();

/*  req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id); */

// @route post /v1/me
// @desc  me
// @access Public

route.post("/", async (req, res) => {
  try {
    if (!req.session.userId && !req.user) {
      return res.status(401).json({ message: "User already logged out." });
    }
    const user = await User.findOne(req.session.userId || req.user.id);

    return res.status(200).json(user);
    req.session.userId = user.id;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = route;
