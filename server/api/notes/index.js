const express = require('express');

const requestHandler = require('./requestHandler');

const router = express.Router();

router.get('/', requestHandler.getAllByUser);

module.exports = router;
