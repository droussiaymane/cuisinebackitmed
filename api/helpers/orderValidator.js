const Joi = require('joi');

const orderSchema = Joi.object({
    patientId: Joi.string().required(),
    disease: Joi.string().required(),
    meal: Joi.string().valid('Petit déjeuner', 'Déjeuner', 'Dîner').required()
})

module.exports = { orderSchema }