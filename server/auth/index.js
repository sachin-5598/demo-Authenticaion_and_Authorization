const express = require('express');

const requestHandler = require('./requestHandlers');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to auth'
  });
});

router.post('/signup', requestHandler.signupHandler);

module.exports = router;
