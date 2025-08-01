const PhotoModel = require("../models/products")
const getImage = async (req, res) => {
  const id = req.params.id;
  try {
    const image = await PhotoModel.findById(id);
    if (!image) {
      return res.status(404).send("Image not found");
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).send("Server error");
  }
}

module.exports = getImage;