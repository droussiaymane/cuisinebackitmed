const express = require('express');
const {
  makeStockOrder, getAllStockOrders, deleteStockOrder, updateStockOrder,
} = require('../controllers/stockOrders.contoller');
const {
  addStockProduct, getAllStockProducts, deleteStockProduct, updateStockProduct,
} = require('../controllers/stockProducts.controller');


const route = express.Router();

// @route POST /v1/stock/orders
// @desc  Make stock order
// @access Private

route.post('/orders', async (req, res) => {
  makeStockOrder(req, res);
});

// @route GET /v1/stock/orders
// @desc  get all orders in stock
// @access Private

route.get('/orders',  async (req, res) => {
  getAllStockOrders(req, res);
});

// @route DELETE /v1/stock/orders/:id
// @desc  delete an order in stock
// @access Private

route.delete('/orders/:id',  async (req, res) => {
  deleteStockOrder(req, res);
});

// @route PATCH /v1/stock/orders/:id
// @desc  update an order in stock
// @access Private

route.patch('/orders/:id',  async (req, res) => {
  updateStockOrder(req, res);
});

// @route POST /v1/stock/products
// @desc  add product to stock
// @access Private

route.post('/products', async (req, res) => {
  addStockProduct(req, res);
});

// @route GET /v1/stock/products?limit=1&page=2
// @desc   list products in stock
// @access Private

route.get('/products',  async (req, res) => {
  getAllStockProducts(req, res);
});

// @route DELETE /v1/stock/products:id
// @desc   delete a product in stock
// @access Private

route.delete('/products/:id',  async (req, res) => {
  deleteStockProduct(req, res);
});

// @route PATCH /v1/stock/products:id
// @desc   update a product in stock
// @access Private

route.patch('/products/:id', async (req, res) => {
  updateStockProduct(req, res);
});
module.exports = route;
