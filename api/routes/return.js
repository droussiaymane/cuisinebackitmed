const express = require('express');
const {
  addReturn, getAllReturns, deleteReturn, updateReturn,
} = require('../controllers/return.controller');


const route = express.Router();

// @route POST /v1/returns
// @desc  add return
// @access Private

route.post('/', async (req, res) => {
  addReturn(req, res);
});

module.exports = route;
