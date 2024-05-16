const {loginUser} = require('../../data/repositories/UserRepository.js');

class LoginUserUC {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async login() {
    try {
      const userData = {
        email: this.email,
        password: this.password
      };
      
      return await loginUser(userData);
    } catch (error) {
      console.error('Error logging admin:', error);
      throw new Error('Failed to login admin');
    }
  }
}

module.exports = LoginUserUC;