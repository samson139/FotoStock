

const validator = require("validator");
const bcrypt = require('bcrypt');
require('dotenv').config();
const UserModel = require("../models/usermodel")
const jwt = require("jsonwebtoken");

const checkPreviousUser = async (val) => {

  const user = await UserModel.findOne({ email: val });
  if (user) {
    return true;
  }
  return false;

}

const signup = async (req, res) => {

  const { firstname, lastname, email, password, confirmedPassword } = req.body;

  if (!validator.equals(password, confirmedPassword)) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  let previousUserResponse = await checkPreviousUser(email);
  if (previousUserResponse) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed", hashedPassword)
    const newUser = await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      confirmedPassword: hashedPassword,
    });

    return res.json({ message: 'User created successfully' });
  }
  catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error });
  }
}

module.exports = {
  signup,
  checkPreviousUser
}