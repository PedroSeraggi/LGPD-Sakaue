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
    type: Boolean,
    required: true,
  },

  createData: {
    type: Date,
    default: Date.now, 
    required: true,
  },
});

const termSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  
  createData: {
    type: Date,
    default: Date.now, 
    required: true,
  },
});



const User = mongoose.model('User', userSchema);
const Term = mongoose.model('Term', termSchema);


module.exports = {
  User, userSchema,
  Term, termSchema
};