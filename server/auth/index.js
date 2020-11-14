const express = require('express');

const middleware = require('./middlewares');
const requestHandler = require('./requestHandlers');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to auth',
    user: req.user,
  });
});

router.post('/signup',
  middleware.validateBody,
  requestHandler.signupHandler
);
router.post('/login',
  middleware.validateBody,
  requestHandler.loginHandler
);

module.exports = router;
