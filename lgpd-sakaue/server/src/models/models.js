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
  
  createdAt: {
    type: Date,
    default: Date.now, 
    required: true,
  },
});



const termRegistrationSchema = new mongoose.Schema({
  accepted: {
    type: Boolean,
    required: true,
    default: false,
  },

  createData: {
    type: Date,
    default: Date.now, 
    required: true,
  },

  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  term: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Term'
  }]
}); 




const User = mongoose.model('User', userSchema);
const Term = mongoose.model('Term', termSchema);
const TermRegistration = mongoose.model('TermRegistration', termRegistrationSchema);


module.exports = {
  User, userSchema,
  Term, termSchema,
  TermRegistration, termRegistrationSchema
};