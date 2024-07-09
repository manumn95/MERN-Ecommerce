const addToCartModel = require("../../models/cartProduct");

const deleteAddToCardProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;
    const deleteProduct = await addToCartModel.deleteOne({
      _id: addToCartProductId,
    });
    res.json({
      message: "Product deleted from the cart",
      data: deleteProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = deleteAddToCardProduct;
