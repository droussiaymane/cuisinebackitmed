const KitchenOrder = require("../models/KitchenOrder");

const express = require('express')
const { submitOrder, listOrders, deleteOrder, getOrderInfo ,updateOrder} = require('../controllers/kitchenOrder.contoller')

const route = express.Router();

// @route POST /v1/kitchenOrder
// @desc  add kitchen Order
// @access Private

route.post('/', 
  async (req, res) => {
    submitOrder(req, res);
    console.log(req.body);
  });

// @route POST /v1/kitchenOrder
// @desc  List kitchen Orders
// @access Private
route.get('/', 
async (req, res) => {
  listOrders(req, res);
  });
// @route DELETE /v1/kitchenOrder/:id
// @desc  delete a kitchen order
// @access Private

route.delete('/:id', 
  async (req, res) => {
    deleteOrder(req, res);
  });

  // @route GET /v1/kitchenOrder/:id
// @desc  get info about the order
// @access Private

route.get('/:id', 
  async (req, res) => {
  getOrderInfo(req,res)
  });

// @route PATCH /v1/kitchenOrder/:id
// @desc  update an order
// @access Private

route.patch('/:id',  async (req, res) => {
  updateOrder(req, res);
});
module.exports = route