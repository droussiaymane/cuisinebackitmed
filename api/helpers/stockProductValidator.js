const Joi = require('joi');

const stockProductSchema = Joi.object({
    productref: Joi.string().required(),
    category: Joi.string().valid('Equipement', 'Aliment', 'Maintenance', 'Produit hygienique').required(),
    yearlyOrders: Joi.number().required(),
    costOfProcurement: Joi.number().required(),
    possessionCost: Joi.number().required(),
    unite: Joi.string().valid('Pièce', 'Lot', 'Kg').required(),
    unitPrice: Joi.number().required(),
    safetyStock: Joi.number().required(),
    actualStock: Joi.number().required(),
    status: Joi.string().valid('Épuisé', 'Disponible', 'Bientôt épuisé').required(),
    economicalQuantity: Joi.number().required(),
    addedAt: Joi.date().required(),
    expireAt: Joi.date().required(),
})

module.exports = { stockProductSchema }