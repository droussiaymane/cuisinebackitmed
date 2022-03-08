const Joi = require('joi');

const returnSchema = Joi.object({
    kitchenOrder: Joi.required(),
    foodWeight: Joi.number().required(),
    plasticWeight: Joi.number().required(),
    cartonPaperWeight: Joi.number().required(),
    metalWeight: Joi.number().required(),
})

module.exports = { returnSchema }