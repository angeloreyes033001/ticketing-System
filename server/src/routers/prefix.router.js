const express = require('express');
const router = express.Router();
const controller = require('../controllers/prefixs.controller');

router.get('/read',controller.getAllPrefix);


module.exports = router;