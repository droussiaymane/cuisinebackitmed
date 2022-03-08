const mongoose = require('mongoose');

const { Schema } = mongoose;

const returnSchema = new Schema({

  kitchenOrder: {
    type: String,
   
  },
  foodWeight: {
    type: Number,
  },
  plasticWeight: {
    type:Number,
  },
  cartonPaperWeight: {
    type: Number,
  },
  metalWeight: {
    type: Number,
  },
  
}, { timestamps: true });
returnSchema.index({ '$**': 'text' });

module.exports = mongoose.model('Return', returnSchema);
