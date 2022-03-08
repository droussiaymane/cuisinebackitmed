const mongoose = require('mongoose');
const StockOrder = require('./StockOrder');

const { Schema } = mongoose;

const Provider = new Schema({
  apeCode: {
    type: String
  },
  companyName: {
    type: String
  },
  representativeName: {
    type: String
  },
  contact: {
    type: String,

  },
  email: {
    type: String,
 
  },
  category: {
    type: String,
  
  },
  specialty: {
    type: String,
    
  },
  criteria: {
    onssa: {
      type: Boolean,
      default: false,
    },
    iso: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Boolean,
      default: false,
    },
    conditions: {
      type: Boolean,
      default: false,
    },
    temperatures: {
      type: Boolean,
      default: false,
    },
    more: {
      type: String,
    },
  },
},
{ timestamps: true });
Provider.index({ '$**': 'text' });

module.exports = mongoose.model('Provider', Provider);
