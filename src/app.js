const express = require("express"); //importing express

const connectdb = require("./config/Database.js");

const app = express(); //the server has been made.

const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user send susessfully");
  } catch (err) {
    res.status(400).send("Error saving data" + err.message);
  }
}); //always do error handling while interacting with database.

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