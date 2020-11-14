const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const middlewares = require('./middleware/errorHandler');
const authMiddlewares = require('./auth/middlewares');

const auth = require('./auth');

const app = express();

// add middlewares
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8080',
}));
app.use(express.json());
app.use(authMiddlewares.createTokenSetUser);

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
