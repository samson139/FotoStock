const { default: mongoose } = require("mongoose");
const PhotoModel = require("../models/products")

const allImages = async (req, res) => {
  try {
    const images = await PhotoModel.find({ user: req.user.id });
    res.json(images);
  }
  catch (error) {
    res.send(`an error occured ${error}`);
  }
}

module.exports = allImages;