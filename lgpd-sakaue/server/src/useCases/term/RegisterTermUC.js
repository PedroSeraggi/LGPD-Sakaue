const {registerTerm} = require('../../data/repositories/TermRepository.js');

class RegisterTermUC {
  constructor(title,desc) {
    this.title = title;
    this.desc = desc;

    
  }

  async create() {
    try {
      const termData = {
        title: this.title,
        desc: this.desc,

   
        
      };
      
      return await registerTerm(termData);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }
}

module.exports = RegisterTermUC ;