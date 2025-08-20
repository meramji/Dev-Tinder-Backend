const express = require("express"); //importing express

const connectdb = require("./config/Database.js");

const app = express(); //the server has been made.

const User = require("./models/user.js");

const validator =require("validator");

const { validateSignupData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");

app.use(express.json());

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
      res.send("login sucessfull!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch(err){
    res.status(400).send("Error : " + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(400).send("user not find");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//delete the user from the database.

app.delete("/user", async (req, res) => {
  const userId = req.body.UserId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("deleted user successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//update the user in database.

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];

    const isupdateallowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isupdateallowed) {
      throw new Error("updates not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot be more than ten.");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    console.log(user);
    res.send("user updated sucessfully");
  } catch (err) {
    res.send("Update Failed:" + err.message);
  }
});
//feed API  -get/feed-get all the data of users for feed.

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // For all users in database
    res.send(users);
  } catch (err) {
    res.send("something went wrong ");
  }
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
