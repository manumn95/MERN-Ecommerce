const express = require('express');
const router = express.Router();
const userSignUpController = require('../controllers/userSignUp');
const userSignIn = require('../controllers/userSIgnin');
const userDetailController = require('../controllers/userDetail');
const authToken = require('../middleware/authToken,js');
const userLogOut = require('../controllers/userLogout');
const allUsers = require('../controllers/allUsers');
const updateUser = require('../controllers/updateUser');
const uploadProductController = require('../controllers/uploadProduct');
const getProductController = require('../controllers/getProduct');
const updateProductController = require('../controllers/updateProduct');

router.post('/signUp',userSignUpController)
router.post('/signIn',userSignIn);
router.get('/user-details',authToken, userDetailController)
router.get('/user-logout',userLogOut);

//Admin pannel

router.get('/allUsers',authToken,allUsers)
router.post('/updateUser',authToken,updateUser)

//upload product

router.post('/upload-product',authToken,uploadProductController)
router.get('/getProduct',getProductController)
router.post('/update-product',authToken,updateProductController)

module.exports = router;
