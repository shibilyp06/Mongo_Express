const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId },
});
const profileModel = new mongoose.model("userProfile", ProfileSchema);

module.exports = profileModel;
