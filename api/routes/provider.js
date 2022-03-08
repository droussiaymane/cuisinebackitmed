const express = require('express');
const {
  providerRegister, listProviders, deleteProvider, updateProvider,
} = require('../controllers/provider.controller');
const session = require('express-session');
const mongoDBSession = require('connect-mongodb-session')(session);

const route = express.Router();

const store = new mongoDBSession({
  uri: "mongodb+srv://adev:adev@cluster0.nphce.mongodb.net/Hospital-api2?retryWrites=true&w=majority",
  collection: "MySessions",
})

route.use(session({
  secret: "The key that will sign the cookie",
  resave: false,
  saveUninitialized: false,
  store: store,
}))


// @route POST /v1/providers
// @desc  Create provider profile
// @access Private

route.post('/', 
  async (req, res) => {
    providerRegister(req, res);
  });

// @route POST /v1/providers
// @desc  List providers profiles
// @access Private
route.get('/', 
  async (req, res) => {
    console.log(req.session.isAuth);
    listProviders(req, res);
  });

// @route DELETE /v1/providers/:id
// @desc  delete a provider
// @access Private

route.delete('/:id', 
  async (req, res) => {
    deleteProvider(req, res);
  });

// @route PATCH /v1/patients/:id
// @desc  update a provider
// @access Private

route.patch('/:id', 
  async (req, res) => {
    updateProvider(req, res);
  });

module.exports = route;
