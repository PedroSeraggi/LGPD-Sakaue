const express = require('express');
const router = express.Router();
const RegisterUserUC = require('../useCases/term/RegisterTermUC.js');
const { ListTerms } = require('../data/repositories/TermRepository.js');
router.post('/register', async (req, res) => {

    try {
      const title = req.body.title;
      const desc = req.body.desc;
      const registerUC = new RegisterUserUC(title, desc); 
      const newTerm = await registerUC.create();
      if (newTerm) {
        res.status(201).json(newTerm);
      }
    } catch (error) {
      console.error('Error registering term:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.get('/termsList', async (req, res) => {
    try {
      const terms = await ListTerms();
      res.status(200).json(terms);
    } catch (error) {
      console.error('Error listing terms:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;
