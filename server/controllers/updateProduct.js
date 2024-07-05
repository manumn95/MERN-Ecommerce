const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

const updateProductController = async(req,res)=>{
  try{

    if(!uploadProductPermission(req.userId))
      {
        throw new Error("permission Denied")
      }
      const {_id,...resBody}=req.body
    const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

res.json({
  message:"product updated Successfully",
  error:false,
  success:true
})
    
  }catch(err)
  {
    res.status(400).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

module.exports = updateProductController