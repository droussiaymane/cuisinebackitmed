const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockOrderSchema = new Schema({

  productLabel: {
    type: String  },

  productName: {
    type: String  },
  // change to supplier
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider'
  },

  status: {
    type: String,
    enum: ['Enregistrée', 'En préparation', 'Reçue', 'En retard'],
    default: 'Enregistrée',
  },

  price: {
    type: Number  },
  quantity: {
    type: Number  },
  creationDate: {
    type: Date
  },
  deliveryDate: {
    type: Date  },
},
{ timestamps: true });
stockOrderSchema.index({ '$**': 'text' });

module.exports = mongoose.model('stockOrder', stockOrderSchema);
