const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body.body || req?.query;
    const product = await productModel.find({ category });

    res.json({
      data: product,
      message: "Data Fetched Successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(201).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = getCategoryWiseProduct;
