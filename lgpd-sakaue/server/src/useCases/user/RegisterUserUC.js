const {registerUser} = require('../../data/repositories/UserRepository.js');

class RegisterUserUC {
  constructor(email,password,name,cpf) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.cpf = cpf;
    
  }

  async create() {
    try {
      const userData = {
        email: this.email,
        password: this.password,
        name:this.name,
        cpf:this.cpf,
        
      };
      
      return await registerUser(userData);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }
}

module.exports = RegisterUserUC;