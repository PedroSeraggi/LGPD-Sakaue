const express = require('express');
const app = express();
const PORT = 3001;
const { connect } = require('./src/data/database');
const cors = require('cors');
require('dotenv').config();


app.use(express.json());


app.use(cors());


connect()
  .then(() => {



    const userController = require('./src/controllers/UserController');
    app.use('/lgpd/users', userController);

    
    const termController = require('./src/controllers/TermController');
    app.use('/lgpd/terms', termController);




    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

