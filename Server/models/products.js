const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imagename: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    maxlength: 256,
  },
  url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  }
},
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;