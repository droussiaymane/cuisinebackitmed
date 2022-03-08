const Joi = require('joi');

const patientSchema = Joi.object({
    fullName: Joi.required(),
  
})

module.exports = { patientSchema }