const express = require("express");
const router = express.Router();
const middleWareValidation = require("../middleware/signupValidation");

const {
  getUserPage,
  getLogin,
  getSignup,
  postSignup,
  postLogin,
  logOut,
  addProfile,
  addProfilePost,
  userInfo
} = require("../controllers/userController").object;

router.get("/", getUserPage);
router.get("/login", getLogin);
router.get("/signup", getSignup);
router.post("/signupAction", middleWareValidation, postSignup);
router.post("/loginAction", postLogin);
router.get("/logout", logOut);
router.get("/addProfile", addProfile);
router.post("/addProfilePost", addProfilePost);
router.get("/userInfo",userInfo)

module.exports = router;
