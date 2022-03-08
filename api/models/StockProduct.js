const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockProductSchema = new Schema({

  productref: {
    type: String,
  
  },

  category: {
    type: String,
  
  },
  yearlyOrders: {
    type: Number,

  },
  costOfProcurement: {
    type: Number,

  },
  possessionCost: {
    type:Number,
  
  },
  unite: {
    type: String,

  },
  unitPrice: {
    type: Number,

  },
  safetyStock: {
    type: Number,
  
  },
  actualStock: {
    type: Number,
  
  },
  status: {
    type: String,
    
  },
  economicalQuantity: {
    type: Number,
  },
  addedAt: {
    type: Date,
  },
  expireAt: {
    type: Date,

  },
},
{ timestamps: true });
stockProductSchema.index({ '$**': 'text' });

module.exports = mongoose.model('stockProduct', stockProductSchema);
