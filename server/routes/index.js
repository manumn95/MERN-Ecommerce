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
const getProductDetail = require("../controllers/product/getProductDetails");
const addTocartController = require("../controllers/user/addToCart");
const countAddToCartProduct = require("../controllers/user/countAddToCart");
const addToCartViewProduct = require("../controllers/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controllers/user/updateAddToCart");
const deleteAddToCardProduct = require("../controllers/user/deleteAddToCart");
const searchProduct = require("../controllers/product/searchProduct");
const filterProductController = require("../controllers/product/filterProduct");
const paymentController = require("../controllers/order/paymentController");
const webhooks = require("../controllers/order/webHook");
const orderController = require("../controllers/order/order.controller");



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
router.post("/product-details", getProductDetail);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// Add to cart

router.post("/addToCart", authToken, addTocartController);
router.get("/countAddedProduct", authToken, countAddToCartProduct);
router.get("/viewCartProduct", authToken, addToCartViewProduct);
router.put("/update-cart-product", authToken, updateAddToCartProduct);
router.delete("/delete-cart-product", authToken, deleteAddToCardProduct);

//payment and order
router.post("/checkout", authToken, paymentController);
router.post('/webhook',webhooks);
router.get('/orderDetails',authToken,orderController)

module.exports = router;
