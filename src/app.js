const express = require("express"); //importing express

const connectdb = require("./config/Database.js");

const app = express(); //the server has been made.

const User = require("./models/user.js");

const validator = require("validator");

const { validateSignupData } = require("./utils/validation.js");

const bcrypt = require("bcrypt");

const cookieparser = require("cookie-parser");

const jwt = require("jsonwebtoken");

const { userauth } = require("./middlewares/auth.js");

app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials"); //never show which information is false to the user .
    }
    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (ispasswordValid) {
      //create a JWT token.

      const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", {
        expiresIn: "1d",
      }); //token expired.

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

//get profile.

app.get("/profile", userauth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/sendconnectionrequest", userauth, async (req, res) => {
  const user = req.user;

  console.log("connection request send");

  res.send(user.firstname + "send the request");
});

connectdb()
  .then(() => {
    console.log("connection is established");
    app.listen(3000, () => {
      console.log("the server is sucessfully listening.");
    }); //server is listening at port 3000.
  })
  .catch((err) => {
    console.error("database cannot  be connected");
  });

//NEVER TRUST req.body.
