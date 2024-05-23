const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },

  cpf: {
    type: String,
    required: true,
  },

  consent: {
    type: String,
    required: true,
  },

  createData: {
    type: Date,
    default: Date.now, 
    required: true,
  },
});

const User = mongoose.model('User', userSchema);


module.exports = {
  User, userSchema
};