const express = require('express');
const router = express.Router();
const controller = require('../controllers/divisions.controller');

router.get('/read',controller.getAllDivisions);


module.exports = router;