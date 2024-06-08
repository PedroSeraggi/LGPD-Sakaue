const express = require('express');
const router = express.Router();
const RegisterUserUC = require('../useCases/user/RegisterUserUC.js');
const LoginUserUC = require('../useCases/user/LoginUserUC.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { ListUsers, DeleteUser, updateUser, registerUser, getUserIdByName, registerTermForUser, verificationTerm, getUserIdByEmail, FindUserByEmail } = require('../data/repositories/UserRepository.js')

router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  try {
    const { email, password, name, cpf, consent } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    const registerUC = new RegisterUserUC(email, hashedPassword, name, cpf, consent);
    if (consent === true) {
      const newUser = await registerUC.create();
      const userId = await getUserIdByName(name);
      const termRegistration = await registerTermForUser(userId);

      res.status(201).json({ newUser, termRegistration });
    } else {
      res.status(400).json({ error: 'Consent not given' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/registerTermoUsuario', async (req, res) => {
  const email = req.body.email;
  console.log('email:',email)
  try {
    console.log('email:',email)
    const userId = await getUserIdByEmail(email);
    const termRegistration = await registerTermForUser(userId);
    res.status(201).json(termRegistration);
  } catch (error) {
    console.error('Erro ao registrar termo de usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});




router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUserUC = new LoginUserUC(email, password);
    const loggedUser = await loginUserUC.login();
 
    if (loggedUser) {
      try {
        const userId = loggedUser._id;
        const aceito = await verificationTerm(userId);

        if (aceito) {
          res.status(200).json(loggedUser);
        } else {
          res.status(400).json({ error: 'Você precisa aceitar o último termo.' });

        }
      } catch (error) {
        res.status(400).json({ error: 'Você precisa aceitar o último termo.' });
      }
    } else {
      res.status(300).json({ error: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
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


router.get("/perfil/:email", async (req, res) => {
  try {
    const email = req.params.email; 
    console.log('Email recebido no backend:', email); 
    const parceiro = await FindUserByEmail(email);

    if (parceiro) {
      res.status(200).json(parceiro);
    } else {
      res.status(404).json({ error: "parceiro não encontrado" });
    }
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pedroseraggiapi@gmail.com',
    pass: 'duhy aswj nvfp gwkn'
  }
});

router.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  let mailOptions = {
    from: 'pedroseraggiapi@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'Email sent: ' + info.response });
  });
});


router.post('/send-email-to-all', async (req, res) => {
  const { subject, text } = req.body;

  try {
    const users = await ListUsers();
    const emails = users.map(user => user.email);

    let emailPromises = emails.map(email => {
      let mailOptions = {
        from: 'pedroseraggiapi@gmail.com',
        to: email,
        subject: subject,
        text: text
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);

    res.status(200).json({ message: 'Emails sent to all users' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
