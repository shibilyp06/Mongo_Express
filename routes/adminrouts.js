const express = require("express");
const multers = require("../middleware/multer");
const multer = require("multer");
const upload = multer({ storage: multers });
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
router.post("/addProductAction", upload.single("image"), addProductPost);
router.get("/showProducts", showProducts);
router.get("/showUsers", showUsers);
router.post("/deleteUser/:userId", deleteUser);
router.get("/editProduct/:productId", editProduct);
router.post(
  "/editProductPost/:productId",
  upload.single("image"),
  editProductPost
);
router.post("/deleteProduct/:productId", deleteProduct);

module.exports = router;
