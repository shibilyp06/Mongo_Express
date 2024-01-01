const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,
  image:String
});

const userModel = new mongoose.model("productDetails", userSchema);

module.exports = userModel;
