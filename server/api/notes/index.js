const express = require('express');

const middleware = require('./middleware');
const requestHandler = require('./requestHandler');

const router = express.Router();

router.get('/', requestHandler.getAllByUser);
router.post(
  '/',
  middleware.validateNote,
  requestHandler.createNewNote
);

module.exports = router;
