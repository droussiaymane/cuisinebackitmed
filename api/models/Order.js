const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  meal: {
    type: String,
    enum: ['Petit déjeuner', 'Déjeuner', 'Dîner'],
    required: true,
  },
}, { timestamps: true });

orderSchema.index({ '$**': 'text' });
module.exports = mongoose.model('Order', orderSchema);
