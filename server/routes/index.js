const express = require('express');

const router = express.Router();

const userSignUpController = require('../controllers/userSignUp');
const userSignIn = require('../controllers/userSIgnin');
const userDetailController = require('../controllers/userDetail');
const authToken = require('../middleware/authToken,js');
const userLogOut = require('../controllers/userLogout');

router.post('/signUp',userSignUpController)
router.post('/signIn',userSignIn);
router.get('/user-details',authToken, userDetailController)
router.get('/user-logout',userLogOut);

module.exports = router;