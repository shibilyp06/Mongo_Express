const userModel = require("../models/userSchema");
const productUserModel = require("../models/productSchema");

const errorMessage = { error: "" };
require("dotenv").config();

let object = {
  adminPage: (req, res) => {
    if (req.session.secure) {
      res.render("admin/adminPage");
    } else {
      res.redirect("/login");
    }
  },

  addProduct: (req, res) => {
    if (req.session.secure) {
      res.render("admin/addProduct");
    } else {
      res.redirect("/login");
    }
  },

  addProductPost: async (req, res) => {
    const { productName, description, price } = req.body;
    const image = req.file
      ? `/uploads/ ${req.file.filename} `
      : "/defult-image.jpg";
    const newProduct = new productUserModel({
      productName: productName,
      description: description,
      price: price,
      image: image,
    });


     
    await newProduct.save().then (() => {
      console.log("product saved");
       res.redirect("/addProduct");
    });
  },

  showProducts: async (req, res) => {
    if (req.session.secure) {
      const allProducts = await productUserModel.find();
      res.render("admin/showProducts", { allProducts });
    } else {
      res.redirect("/login");
    }
  },
  showUsers: async (req, res) => {
    if (req.session.secure) {
      try {
        let users = await userModel.find();
        res.render("admin/showUsers", { allUsers: users });
      } catch (err) {
        // Handle errors appropriately
        res.status(500).send("Error fetching users");
      }
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.userId;
    await userModel.findOneAndDelete({ _id: userId });
    res.redirect("/showUsers");
  },
  editProduct: async (req, res) => {
    if (req.session.secure) {
      const productId = req.params.productId;
      const product = await productUserModel.findOne({ _id: productId });
      res.render("admin/editProduct", { product });
    }
  },
  editProductPost: async (req, res) => {
    let { productName, description, price } = req.body;
    const productId = req.params.productId;
    const product = await productUserModel.findOne({ _id: productId });

    product.productName = productName;
    product.description = description;
    product.price = price;
    await product.save().then(() => {
      console.log("Product updated");
    });
    res.redirect("/editProduct/:productId");
  },
  deleteProduct: async (req, res) => {
    const productId = req.params.productId;
    await productUserModel.findOneAndDelete({ _id: productId });
    res.redirect("/showProducts");
  },
};

module.exports = { errorMessage, object };

// UserModel = [
//   {
//     _id: "",
//     name: "",
//     password: "",
//   },
// ];

// ProductModel = [
//   {
//     _id: '1',
//     name: 'Shampoo',
//     price:100,
//   }
// ]

// CartModel = [
//   {
//     productId: "1",
//     userId: "",
//     price: 100,
//     quantity: 5,
//     total: 500
//   },
// ];

// req.body.userId
