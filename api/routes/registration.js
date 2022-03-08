const express = require('express');
const {
  userRegister,
} = require('../controllers/user.controller');

const route = express.Router();

// @route POST /v1/register
// @desc  add user
// @access Public

route.post('/', 
  async (req, res) => {
    if (req.session.authenticated) {
      res.json({"Message": "You are logged In, You cannot create a user"})
    } else {
      userRegister(req.body, res);
    }
  });

module.exports = route;
