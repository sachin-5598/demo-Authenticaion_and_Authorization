const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const middlewares = require('./middleware/errorHandler');

const app = express();

// add middlewares
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'app is working'
  });
});

// error handling
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
