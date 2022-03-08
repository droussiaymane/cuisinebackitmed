const express = require("express");
const { userLogin } = require("../controllers/user.controller");

// We are gonna use jwt

const jwt = require('jsonwebtoken')

const route = express.Router();

/*  req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id); */

// @route post /v1/login
// @desc  login
// @access Public
route.get("/",async (req,res)=>{res.status(200).send("login");})
route.post("/", async (req, res) => {

  console.log(req.body)
  
  var user_id;
  if ((undefined== await userLogin(req.body, res))) {
    return res.status(404).send({ message: 'User not found or wrong credentials' })
  }
  else{
  const token = jwt.sign({ id: user_id }, 'secret')

  res.cookie('jwt', token, {
    httpOnly: true
  })

  res.status(200)
  return res.send({
    message: 'The user is authenticated'
  });
  
}})

module.exports = route;