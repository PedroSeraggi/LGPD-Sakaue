const express = require('express');
const router = express.Router();
const RegisterUserUC = require('../useCases/user/RegisterUserUC.js');
const LoginUserUC = require('../useCases/user/LoginUserUC.js');
const bcrypt = require('bcrypt');
const { ListUsers, DeleteUser, updateUser, registerUser } = require('../data/repositories/UserRepository.js')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  try {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, salt);
    const name = req.body.name;
    const cpf = req.body.cpf;
    const registerUC = new RegisterUserUC(email, password, name, cpf); 
    const newUser = await registerUC.create();
    if (newUser) {
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUserUC = new LoginUserUC(email, password); 
    const loggedUser = await loginUserUC.login();
    if (loggedUser) {
      res.status(200).json(loggedUser); // Login bem-sucedido
    } else {
      res.status(400).json({ error: 'Usuário ou senha incorretos' }); // Usuário ou senha incorretos
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' }); // Erro interno do servidor
  }
});

router.get('/usersList', async (req, res) => {
  try {
    const users = await ListUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete/:_id', async (req, res) => {
  try {
    const userId = req.params._id;
    const result = await DeleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/update/:_id', async (req, res) => {
  try {
    const userId = req.params._id;
    const { name, email, cpf } = req.body; 
    const result = await updateUser(userId, { name, email, cpf }); 
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
