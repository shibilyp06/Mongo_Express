const bcrypt = require("bcrypt");
const userModel = require("../models/userSchema");
const productsModel = require("../models/productSchema");
const profileModel = require("../models/userProfileSchema");
const { default: mongoose } = require("mongoose");

let message = { error: "" };

let object = {
  getUserPage: async (req, res) => {
    if (req.session.key) {
      console.log("reached here");
      const allProducts = await productsModel.find();
      res.render("user/user", { allProducts });
    } else {
      res.redirect("/signup");
    }
  },
  getLogin: (req, res) => {
    if (req.session.key) {
      res.redirect("/");
    }
    if (req.session.secure) {
      res.redirect("/home");
    } else {
      res.render("user/login", message);
      message = { error: "" };
    }
  },
  getSignup: (req, res) => {
    if (req.session.key) {
      res.redirect("/");
    } else {
      res.render("user/signup", message);
      message = { error: "" };
    }
  },

  postSignup: async (req, res) => {
    // try{
    let { FirstName, LastName, Email, password, reEnterPassword } = req.body;

    const existingUser = await userModel.findOne({ email: Email });

    if (existingUser) {
      message.error = "Email is already exist ,pls login";
      res.redirect("/login");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      // console.log(hashedPassword, " password");
      const newUser = new userModel({
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: password,
      });
      await newUser.save().then(
        (data) => {
          console.log(data);
        },
        (erroe) => {
          console.log(erroe);
        }
      );
      req.session.key = newUser._id;
      console.log(newUser._id, "  jjjjj");
      // console.log(usersData);
      res.redirect("/");
    }
    // } catch (error) {
    //   console.error('Error in signup:', error);
    //   res.redirect("/signup"); // Redirect in case of an error
    // }
  },
  
  postLogin: async (req, res) => {
    let { email, password } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      const logUser = await bcrypt.compare(password, existingUser.password);
      if (logUser) {
        if (existingUser.role == "admin") {
          req.session.secure = existingUser._id;
          console.log();

          res.redirect("/home");
        } else {
          // console.log(existingUser.email);
          req.session.key = existingUser._id;
          res.redirect("/");
        }
      }
    } else {
      message.error = "user not found";
      res.redirect("/login");
    }
  },
  logOut: (req, res) => {
    req.session.destroy((error) => {
      if (!error) {
        res.redirect("/login");
      }
    });
  },
  addProfile: async (req, res) => {
    console.log(req.session);
    const userId = req.session.key;
    console.log(userId, " Email id");
    const user = await userModel.findOne({ _id: userId });
    console.log(user.firstName);
    res.render("user/addProfile", { user });
  },

  addProfilePost: async (req, res) => {
    const { username, email, phone, gender, dob, userId } = req.body;
    console.log(phone);
    const Id = req.session.key;
    console.log("this");
    await profileModel.updateOne(
      { userId: Id },
      { $set: { phone: phone, gender: gender, dob: dob } },
      { upsert: true }
    );
    res.redirect("/userInfo");
  },
  userInfo: async (req, res) => {
    if (req.session.key) {
      const userId = req.session.key;
      const user = await userModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: "userprofiles",
            localField: "_id",
            foreignField: "userId",
            as: "moreDetails",
          },
        },
      ]);
      console.log(user);
      res.render("user/userInfo", { user });
    } else {
      res.redirect("/login");
    }
  },
};

module.exports = { object, message };
