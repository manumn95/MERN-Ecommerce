const productModel = require("../models/productModel")

const getProductController = async(req,res)=>{

  try{

    const allProducts = await productModel.find().sort({createdAt:-1});
    res.json({
      message:"All product",
      success:true,
      error:false,
      data:allProducts
    })  

  }
  catch(err)
  {
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }

}

module.exports=getProductController;