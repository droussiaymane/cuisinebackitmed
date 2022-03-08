const Joi = require('joi');

const userSchema = Joi.object({
    fullName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: Joi.string().valid('Admin', 'Aide soignant', 'Agent restauration', 'Responsable approvisionnement', 'None')
})

module.exports = { userSchema }