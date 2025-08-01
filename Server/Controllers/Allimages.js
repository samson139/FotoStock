const PhotoModel = require("../models/products")

const allImages = async (req, res) => {
  const token = req.cookies.jwtToken;
  const userId = req.userId;
  try {
    const images = await PhotoModel.find({ user: userId });
    res.json(images);

  }
  catch (error) {
    res.send(`an error occured ${error}`);
  }
}

module.exports = allImages;