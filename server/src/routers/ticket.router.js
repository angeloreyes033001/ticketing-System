const express = require('express');
const controller = require('../controllers/tickets.controller');
const verifyToken = require('../middlewares/cookieVerify');
const router = express.Router();

router.post('/create',verifyToken,controller.createTicket);
router.post('/assigned',verifyToken,controller.assigned_ticket);
router.get('/takeAnAction/:id',verifyToken,controller.takeAnAction);
router.post('/update-taken-action',verifyToken,controller.updateTakeAction);
router.get('/total-completed',verifyToken,controller.totalCompleted);
router.get('/total-pending',verifyToken,controller.totalPending);
router.get('/total-in-process',verifyToken,controller.totalInProcess);

module.exports = router;