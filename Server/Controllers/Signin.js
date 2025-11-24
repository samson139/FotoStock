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
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      let signinToken = jwt.sign({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname
      },
        `${process.env.SECRETKEY}`,
        { expiresIn: 1000 * 60 * 60 * 24 });
      res.cookie("jwtToken", signinToken, {
        maxAge: 1000 * 60 * 60 * 24,
      });
      return res.status(200).json({
        signinToken, message: "Logged in successfully"
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
