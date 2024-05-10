const express = require('express');
const router = express.Router();

const user = require('./user.router');
const division = require('./division.router');
const section = require('./section.router');
const prefix = require('./prefix.router');
const ticket = require('./ticket.router');

router.use('/users',user);
router.use('/divisions',division);
router.use('/sections',section);
router.use('/prefixs',prefix);
router.use('/tickets',ticket);

module.exports = router;