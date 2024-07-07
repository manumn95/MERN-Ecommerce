const userModel = require("../../models/userModel");

const allUsers = async (req, res) => {
  try {
     const allUser = await userModel.find();
    res.json({
      message: "All Users",
      data:allUser,
      success:true,
      error:false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = allUsers;
