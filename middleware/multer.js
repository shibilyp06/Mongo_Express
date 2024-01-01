const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Define the destination where uploaded files will be stored
      cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
      // Define how uploaded files should be named
      cb(null,file.fieldname + '-' +  Date.now() + path.extname(file.originalname));
    }

  });
  
  const upload = multer({ storage: storage });


  module.exports = upload 
  
