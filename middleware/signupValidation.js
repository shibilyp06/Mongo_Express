function middleWareValidation(req, res, next) {
  // const errorMessage = { error: "" };
  const errorMessage = require("../controllers/userController").message

console.log(errorMessage.error);
  const { firstName, lastName, email, password, reEnterpassword } = req.body;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   //   const validateEmail = emailRegex.test(email);
  const validatePassword = passwordRegex.test(password);
  // //   const rePass = req.body.password === req.body.reEnterpassword
  const rePass = password === reEnterpassword;

  console.log(rePass, validatePassword);

  if (validatePassword && rePass) {
    next();
  } else {
    if (!validatePassword) {
      errorMessage.error = "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters. ";
    }
    if (!rePass) {
      errorMessage.error = "Password does not match"
    }
    res.redirect("/signup");
  }
}
module.exports = middleWareValidation;
