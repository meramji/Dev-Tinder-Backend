const express = require("express"); //importing express

const connectdb = require("./config/Database.js");

const app = express(); //the server has been made.

const User = require("./models/user.js");

app.post("/signup", async (req, res) => {
  //creating a new instance of the user model.

  const user = new User({
    firstname: "xcbcecnj",
    lastname: "ji",
    password: "xwninwm",
    emailId: "dpwmdwoknh@gmail.com",
  });
  try {
    await user.save();
    res.send("user send susessfully");
  } catch (err) {
    res.status(400).send("Error saving data" + err.message);
  }
});  //always do error handling while interacting with database.

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
