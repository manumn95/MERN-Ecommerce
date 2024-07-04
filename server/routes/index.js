const express = require('express');

const router = express.Router();

const userSignUpController = require('../controllers/userSignUp');

router.post('/signUp',userSignUpController)

module.exports = router;