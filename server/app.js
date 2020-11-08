const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const middlewares = require('./middleware/errorHandler');
const auth = require('./auth');

const app = express();

// add middlewares
app.use(morgan('dev'));
app.use(express.json());

// add routes
app.get('/', (req, res) => {
  res.json({
    message: 'app is working'
  });
});

app.use('/auth', auth);

// error handling
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
