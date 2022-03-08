const Joi = require('joi');

const kitchenOrderSchema = Joi.object({
    service: Joi.string().valid('ORL', 'Cardiologie', 'Endocrinologie', 'Gastroentérologie', 'Neurologie', 'Urgences', 'Réanimation').required(),
    meal: Joi.string().valid('Petit déjeuner','Déjeuner','Dîner').required(),
    status: Joi.string().valid('Lancement','Préparation','Distribution','Servi').required(),
    staffNbr: Joi.number(),
    recycled: Joi.boolean()
})

module.exports = { kitchenOrderSchema }