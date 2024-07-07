const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel")

const uploadProductController=async(req,res)=>{
  try{

    const sessionUserId =req.userId;

    if(!uploadProductPermission(sessionUserId))
      {
        throw new Error("permission Denied")
      }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message:'product Uploaded Successfully',
      success:true,
      error:false,
      data:saveProduct
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

module.exports=uploadProductController