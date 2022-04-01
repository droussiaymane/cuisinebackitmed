const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'fullName required'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  role: {
    type: String,
    enum: ['Admin', 'Aide soignant', 'Agent restauration', 'Responsable approvisionnement', 'None'],
  },
  active : Boolean
}, { timestamps: true });
userSchema.index({ '$**': 'text' });

module.exports = mongoose.model('User', userSchema);
