const express = require('express');
const router = express.Router();
const controller = require('../controllers/sections.controller');

router.get('/read',controller.getAllSections);


module.exports = router;