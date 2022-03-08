const Joi = require('joi');

const stockOrderSchema = Joi.object({
    productLabel: Joi.string().required(),
    productName: Joi.string().required(),
    providerId: Joi.required(),
    status: Joi.string().valid('Enregistrée', 'En préparation', 'Reçue', 'En retard').required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    creationDate: Joi.date().required(),
    deliveryDate: Joi.date().required(),
})

module.exports = { stockOrderSchema }