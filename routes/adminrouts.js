const express = require("express");
const multer = require("../middleware/multer");
const router = express.Router();
const {
  adminPage,
  addProduct,
  addProductPost,
  showProducts,
  showUsers,
  deleteUser,
  editProduct,
  editProductPost,
  deleteProduct,
  
} = require("../controllers/adminContrillers").object;
router.get("/home", adminPage);
router.get("/addProduct", addProduct);
router.post("/addProductAction",multer.single("image") ,addProductPost);
router.get("/showProducts", showProducts);
router.get("/showUsers", showUsers);
router.post("/deleteUser/:userId", deleteUser);
router.get("/editProduct/:productId",editProduct)
router.post("/editProductPost/:productId", editProductPost);
router.post("/deleteProduct/:productId", deleteProduct);

module.exports = router;
