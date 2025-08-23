const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  //creating a new instance of the user model

  try {
    validateSignupData(req);

    const { firstname, lastname, emailId, password } = req.body;

    //Encrypt the password.
    const passwordhash = await bcrypt.hash(password, 10);
    console.log(passwordhash);

    const user = new User({
      firstname,
      lastname,
      emailId,
      password: passwordhash,
    });

    await user.save();
    res.send("user send sucessfully");
  } catch (err) {
    res.status(400).send("Error  :" + err.message);
  }
}); //always do error handling while interacting with database.

//login API for User.

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials"); //never show which information is false to the user .
    }
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const ispasswordValid = await user.validatePassword(password);
    if (ispasswordValid) {
      //create a JWT token.

      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), //expires cookie.
      });

      res.send("login sucessfull!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
authRouter.post("/logout",(req,res) =>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  });
  res.send("logout sucessfull!!");
});

module.exports = { authRouter };
