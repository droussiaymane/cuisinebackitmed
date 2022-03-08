const express = require('express');
const {
  makeOrder, getAllOrders, deleteOrder, updateOrder,
} = require('../controllers/order.controller');

const route = express.Router();

// @route POST /v1/order
// @desc  Make order
// @access Private

route.post('/',  async (req, res) => {
  makeOrder(req, res);
});

// @route GET /v1/order
// @desc  get all orders
// @access Private

route.get('/',  async (req, res) => {
  getAllOrders(req, res);
});

// @route DELETE /v1/order/:id
// @desc  delete an order
// @access Private

route.delete('/:id',  async (req, res) => {
  deleteOrder(req, res);
});

// @route PATCH /v1/order/:id
// @desc  update an order
// @access Private

route.patch('/:id',  async (req, res) => {
  updateOrder(req, res);
});

module.exports = route;
