const express = require('express');
const {
  patientRegister, listPatients, deletePatient, updatePatient, getPatient
} = require('../controllers/patient.controller');

const route = express.Router();

// @route POST /v1/patients
// @desc  Create patient profile
// @access Private

route.post('/', 
  async (req, res) => {
    patientRegister(req.body, res);
  });

// @route POST /v1/patients
// @desc  List patients profile
// @access Private
route.get('/', 
  async (req, res) => {
    listPatients(req, res);
  });

// @route DELETE /v1/patients/:id
// @desc  delete a patient
// @access Private

route.delete('/:id', 
  async (req, res) => {
    deletePatient(req, res);
  });

// @route PATCH /v1/patients/:id
// @desc  update a patient info
// @access Private

route.get('/:fullName', async (req, res) => {
    getPatient(req, res);
})

route.patch('/:id', 
  async (req, res) => {
    updatePatient(req, res);
  });

module.exports = route;
