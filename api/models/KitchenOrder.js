const mongoose = require('mongoose');

const { Schema } = mongoose;

const kitchenOrderSchema = new Schema({
  service: {
    type: String,
    enum: ['ORL', 'Cardiologie', 'Endocrinologie',
      'Gastroentérologie', 'Neurologie',
      'Urgences', 'Réanimation'],
    required: [true, 'service est obligatoire'],
  },
  meal: {
    type: String,
    enum: ['Petit déjeuner', 'Déjeuner', 'Dîner'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Lancement', 'Préparation', 'Distribution','Servi'],
    default:'Lancement'
  },
  staffNbr: {
    type:Number
  },
  recycled: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true });
  kitchenOrderSchema.index({ '$**': 'text' });

module.exports = mongoose.model('KitchenOrder', kitchenOrderSchema);