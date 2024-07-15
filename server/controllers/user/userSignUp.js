const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const userSignUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User already Exist");
    }

    if (!email) {
      throw new Error("please Provide Email");
    }
    if (!password) {
      throw new Error("please Provide Password");
    }
    if (!name) {
      throw new Error("please Provide Name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: "Customer",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      message: "User Created Successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: "image Size is too large" || err,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignUpController;
