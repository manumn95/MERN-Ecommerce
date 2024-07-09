const productModel = require("../../models/productModel");
const getProductDetail = async (req, res) => {
  try {
    const { productId } = req.body.body;

    const product = await productModel.findById(productId);
    res.json({
      data: product,
      message: "OK",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: true,
    });
  }
};
module.exports = getProductDetail;
