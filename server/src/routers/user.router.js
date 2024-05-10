const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/cookieVerify');

const user = require('../controllers/users.controller');
router.get('/info',verifyToken,user.userInfo);
router.get('/verify',verifyToken,user.verifyLogin);
router.post('/login',user.loginAccount);
router.post('/create-account', user.createAccountByRoot);
router.post('/register', user.registration);
router.get('/unverified',verifyToken,user.getAllUserUnVerified);
router.get('/verified',verifyToken,user.getAllUserVerified);
router.put('/verify-account/:id',verifyToken,user.verifyAccount);
router.put('/update-status/:id',verifyToken,user.updateStatus);
router.get('/read-user-base-role/:role',verifyToken,user.getUserRole);
router.get('/logout',verifyToken,user.logout);
// router.get('/password',user.generatePassword);
module.exports = router;