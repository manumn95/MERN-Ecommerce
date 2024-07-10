const addToCartModel = require("../../models/cartProduct");

const addTocartController = async (req, res) => {
  try {
    const { productId } = req.body.body;
    const currentUser = req.userId;
    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Product already exist in your cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = await new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();
    res.json({
      data: saveProduct,
      message: "Product Added in the cart",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      mesage: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = addTocartController;
