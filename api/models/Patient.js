const mongoose = require('mongoose');
const OrderModel = require('./Order');

const { Schema } = mongoose;

// Add ipp instead of

const patientSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Nom complet est obligatoire'],

  },
  ssNumber: {
    type: Number,
    unique: true,
    required: [true, 'numéro de sécurité sociale est obligatoire'],

  },
  roomNumber: {
    type: Number,
    required: [true, 'numéro de chambre est obligatoire'],
  },

  gender: {
    type: String,
    enum: ['homme', 'femme'],
    default: 'femme',
    required: [true, 'numéro de chambre est obligatoire'],
  },

  birthday: {
    type: Date,
    required: [true, 'date de naissance  est obligatoire'],
  },

  enterDate: {
    type: Date,
    required: [true, "date d'entrée  est obligatoire"],
  },
  sejourn: {
    type: String,
    enum: ['long séjour', 'court séjour'],
    required: [true, 'type séjour  est obligatoire'],
  },
  service: {
    type: String,
    enum: ['ORL', 'Cardiologie', 'Endocrinologie',
      'Gastroentérologie', 'Neurologie',
      'Urgences', 'Réanimation'],
    required: [true, 'service est obligatoire'],
  },
  foodParticularity: {
    salt: Boolean,
    sugar: Boolean,
    allergies: {
      eggs: Boolean,
      milk:Boolean,
      seafood:Boolean,
      grain:Boolean,
      nuts:Boolean,
      fruits:Boolean,
    },
    other:String,
  },
  disease:String,
  active: {
    type: Boolean,
    default: true,
  }
},
{ timestamps: true });

patientSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Patient', patientSchema);
