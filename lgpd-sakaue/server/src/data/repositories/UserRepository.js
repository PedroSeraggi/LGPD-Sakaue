const bcrypt = require('bcrypt')
const { User } = require('../../models/models');
const { Term } = require('../../models/models');
const { TermRegistration } = require('../../models/models');


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


async function updateUser(userId, userData) {
  try {
    // Verificar se o usuário com o ID fornecido existe
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error('Usuário não encontrado');
    }

    // Atualizar os dados do usuário com os novos dados fornecidos
    existingUser.name = userData.name;
    existingUser.email = userData.email;
    existingUser.cpf = userData.cpf;

    // Salvar as alterações no banco de dados
    await existingUser.save();

    // Retornar uma mensagem de sucesso
    return { message: "Usuário atualizado com sucesso" };
  } catch (error) {
    // Se ocorrer um erro, logar o erro e retornar um erro 500
    console.error('Erro ao atualizar usuário:', error);
    throw new Error('Erro interno do servidor');
  }
}


async function registerTermForUser(userId) {
  try {
      const lastTermId = await getLastTermId();
      const registrationData = {
          user: userId,
          term: lastTermId,
          accepted: true
      };

      const newRegistration = new TermRegistration(registrationData);
      await newRegistration.save();

      return newRegistration;
  } catch (error) {
      console.error('Erro ao registrar o termo para o usuário:', error);
      throw new Error('Erro ao registrar o termo para o usuário.');
  }
}

async function getUserIdByName(userName) {
  try {
      const user = await User.findOne({ name: userName }).exec();
      if (!user) {
          throw new Error('Usuário não encontrado.');
      }
      return user._id;
  } catch (error) {
      console.error('Erro ao buscar usuário pelo nome:', error);
      throw new Error('Erro ao buscar usuário pelo nome.');
  }
}
async function getUserIdByEmail(userEmail) {
  try {
      console.log('Email recebido:', userEmail); // Adicionando console.log para verificar o email recebido
      const user = await User.findOne({ email: userEmail }).exec();
      if (!user) {
          throw new Error('Usuário não encontrado.');
      }
      return user._id;
  } catch (error) {
      console.error('Erro ao buscar usuário pelo email:', error);
      throw new Error('Erro ao buscar usuário pelo email.');
  }
}

async function getLastTermId() {
    try {
        const lastTerm = await Term.findOne().sort({ createdAt: -1 }).exec();
        if (!lastTerm) {
            throw new Error('Nenhum termo encontrado.');
        }
        return lastTerm._id;
    } catch (error) {
        console.error('Erro ao obter o último ID do termo:', error);
        throw new Error('Erro ao obter o último ID do termo.');
    }
}
async function verificationTerm(userId) {
  try {
    const lastTermId = await getLastTermId();

    if (!lastTermId) {
      throw new Error('Nenhum ID de termo encontrado.');
    }

    const lastTerm = await TermRegistration.findOne({ term: lastTermId, user: userId });

    if (!lastTerm) {
      throw new Error('Nenhum registro encontrado.');
    }

    return true;
  } catch (error) {
    
    console.error('Erro ao obter o registro :', error);
    throw new Error('Erro ao obter o último termo.');
  }
}



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    ListUsers,
    DeleteUser,
    registerTermForUser,
    getUserIdByName,
    verificationTerm,
    getUserIdByEmail
};