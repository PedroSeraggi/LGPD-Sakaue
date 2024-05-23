const {registerUser} = require('../../data/repositories/UserRepository.js');

class RegisterUserUC {
  constructor(email,password,name,cpf,consent) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.cpf = cpf;
    this.consent = consent;
    
  }

  async create() {
    try {
      const userData = {
        email: this.email,
        password: this.password,
        name:this.name,
        cpf:this.cpf,
        consent:this.consent,
        
      };
      
      return await registerUser(userData);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }
}

module.exports = RegisterUserUC;