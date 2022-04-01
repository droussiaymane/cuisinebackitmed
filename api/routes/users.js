const express = require('express');
const {
  listUsers, deleteUser, updateUser, userRegister, activateUser
} = require('../controllers/user.controller');

const route = express.Router();

// @route POST /v1/users
// @desc  list users
// @access Private

route.get('/',
  async (req, res) => {
    listUsers(req, res);
  });
  
route.get('/:id',
  async (req, res) => {
    activateUser(req, res);
  });

route.post('/', async (req, res) => {
  userRegister(req.body, res);
})

// @route DELETE /v1/users/:id
// @desc  delete a user
// @access Private

route.delete('/:id',
  async (req, res) => {
    deleteUser(req, res);
  });

// @route PATCH /v1/users/:id
// @desc  update a user
// @access Private

route.patch('/:id', 
  async (req, res) => {
    updateUser(req, res);
  });
  
module.exports = route;
