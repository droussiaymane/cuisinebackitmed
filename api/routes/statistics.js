const express = require('express');
const {
  getUsersStatistics,getServiceStatistics,getMealsStatistics
} = require('../controllers/statistics.controller');

const route = express.Router();

// @route GET /v1/statistics/users
// @desc  users statistics
// @access Private

route.get('/users', 
  async (req, res) => {
    getUsersStatistics(req,res)
  });

// @route GET /v1/statistics/users
// @desc  Service statistics
// @access Private

route.get('/service',
async (req, res) => {
  getServiceStatistics(req,res)
});

// @route GET /v1/statistics/meals
// @desc  meals statistics
// @access Private

route.get('/meals',
async (req, res) => {
  getMealsStatistics(req,res)
});
module.exports = route