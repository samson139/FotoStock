const { checkPreviousUser } = require("../Controllers/Signup");
const bcrypt = require("bcrypt");
const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signin = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  if (!(await checkPreviousUser(email))) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }
    // Create JWT token
    const signinToken = jwt.sign(
      {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.SECRETKEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ message: "Logged in successfully", token: signinToken });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signin };

