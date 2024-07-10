const productModel = require('../../models/productModel');

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];

    // Build the query based on the category list
    const query = categoryList.length > 0 ? { category: { "$in": categoryList } } : {};

    const products = await productModel.find(query);

    res.json({
      data: products,
      message: "Filter Product",
      error: false,
      success: true
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true
    });
  }
};

module.exports = filterProductController;
