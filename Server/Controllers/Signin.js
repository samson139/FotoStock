const { checkPreviousUser } = require("../Controllers/Signup")
const bcrypt = require('bcrypt');
const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signin = async (req, res) => {
  const { email, password } = req.body;


  if (!await checkPreviousUser(email)) return res.status(400).json({ message: 'User Doesnt exist' })
  try {
    const user = await UserModel.findOne({ email: email })
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("jwt secret", process.env.SECRETKEY);
    if (passwordMatch) {
      const signinToken = jwt.sign({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname
      },
        process.env.SECRETKEY,
        { expiresIn: "1d" });
      const isProduction = process.env.NODE_ENV === "development";
      res.cookie("jwtToken", signinToken, {
        httpOnly: true,
        secure: isProduction,                // true for HTTPS (prod), false for localhost
        sameSite: isProduction ? "None" : "Lax", // None for cross-origin, Lax for localhost
        maxAge: 1000 * 60 * 30
      });

      return res.status(200).json({
        message: "Logged in successfully"
      });
    }
    else {
      return res.status(401).json({ message: "Wrong Password" });
    }
  }
  catch (error) {

    return res.status(500).json({ message: "An error occured and the code is " });
  }
}

module.exports = {
  signin
}
