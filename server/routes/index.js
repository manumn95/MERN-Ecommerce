const express = require('express');

const router = express.Router();

const userSignUpController = require('../controllers/userSignUp');
const userSignIn = require('../controllers/userSIgnin');

router.post('/signUp',userSignUpController)
router.post('/signIn',userSignIn);

module.exports = router;