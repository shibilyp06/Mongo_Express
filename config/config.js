const mongoose = require("mongoose");

function connectMongoose(){
    mongoose
  .connect(
    "mongodb://127.0.0.1:27017/levelx?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1"
  )
  .then(() => {
    console.log("mongoose connected");
  });

}

  module.exports = connectMongoose()