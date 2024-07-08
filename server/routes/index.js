const express = require("express");
const router = express.Router();

const userDetailController = require("../controllers/user/userDetail");
const authToken = require("../middleware/authToken,js");
const userLogOut = require("../controllers/user/userLogout");
const allUsers = require("../controllers/user/allUsers");
const updateUser = require("../controllers/user/updateUser");
const uploadProductController = require("../controllers/product/uploadProduct");
const getProductController = require("../controllers/product/getProduct");
const updateProductController = require("../controllers/product/updateProduct");
const userSignUpController = require("../controllers/user/userSignUp");
const userSignIn = require("../controllers/user/userSignin");
const getCategoryProduct = require("../controllers/product/getCatergoryProductOne");
const getCategoryWiseProduct = require("../controllers/product/getCategorywiseProduct");
router.post("/signUp", userSignUpController);
router.post("/signIn", userSignIn);
router.get("/user-details", authToken, userDetailController);
router.get("/user-logout", userLogOut);

//Admin pannel

router.get("/allUsers", authToken, allUsers);
router.post("/updateUser", authToken, updateUser);

//product
router.post("/upload-product", authToken, uploadProductController);
router.get("/getProduct", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-category-product", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);

module.exports = router;
