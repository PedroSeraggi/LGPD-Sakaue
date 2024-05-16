const { User } = require('../../models/models');
const bcrypt = require('bcrypt')

async function registerUser(userData) {
  try {
    const existingUser = await User.findOne({ email: userData.email});
    if (existingUser) {
      return false
    }
    const newUser = new User(userData);
    
    await newUser.save();

    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
}



async function loginUser(userData) {
  try {
    const user = await User.findOne({ email: userData.email })
    if(user){
      if (await bcrypt.compare(userData.password,user.password)){
        return user
      }else{
        return false
      }
    }else{
      return false
    }
  } catch (error) {
    console.error('Error logging user:', error);
    throw new Error('Failed to login user');
  }
}



async function ListUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    throw new Error('Failed to list users');
  }
}


async function DeleteUser(userId) {
  try {
    // Tentar encontrar e excluir o parceiro pelo ID
    const result = await User.deleteOne({ _id: userId });

  
    if (result.deletedCount === 0) {
      throw new Error('Usuario não encontrado');
    }

    // Retornar uma mensagem de sucesso
    return { message: "Usuario removido com sucesso" };
  } catch (error) {
    // Se ocorrer um erro, logar o erro e retornar um erro 500
    console.error('Erro ao deletar Usuario:', error);
    throw new Error('Erro interno do servidor');
  }
}




module.exports = {
    registerUser,
    loginUser,
    ListUsers,
    DeleteUser
};