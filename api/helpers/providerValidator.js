const Joi = require('joi');

const nestedSchema = Joi.object({
    onssa: Joi.boolean().required(),
    iso: Joi.boolean().required(),
    price: Joi.boolean().required(),
    delay: Joi.boolean().required(),
    conditions: Joi.boolean().required(),
    temperatures: Joi.boolean().required(),
    more: Joi.string(),
})

const providerSchema = Joi.object({
    apeCode: Joi.string().required(),
    companyName: Joi.string().required(),
    representativeName: Joi.string().required(),
    contact: Joi.string().required(),
    email: Joi.string().email().required(),
    category: Joi.string().valid('Equipement','Aliments').required(),
    speciality: Joi.string().required(),
    service: Joi.string().required(),
    foodParticularity: nestedSchema
})

module.exports = { providerSchema }