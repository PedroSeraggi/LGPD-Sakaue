const { Term } = require('../../models/models');
const bcrypt = require('bcrypt')

async function registerTerm(termData) {
  try {
    const existingTerm = await Term.findOne({ title: termData.title});
    if (existingTerm) {
      return false
    }
    const newTerm = new Term(termData);
    
    await newTerm.save();

    return newTerm;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
}




async function ListTerms() {
  try {
    const terms = await Term.find({});
    return terms;
  } catch (error) {
    console.error('Error listing terms:', error);
    throw new Error('Failed to list terms');
  }
}




module.exports = {
  registerTerm,
  ListTerms
   
};