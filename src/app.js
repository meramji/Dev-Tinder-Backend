const express = require("express"); //importing express

const connectdb = require("./config/Database.js");

const app = express(); //the server has been made.

// const validator = require("validator");

const cookieparser = require("cookie-parser");

// const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieparser());

const { authRouter } = require("./Routes/auth.js");
const { profileRouter } = require("./Routes/profile.js");
const { requestRouter } = require("./Routes/requests.js");
const userRouter=require("./Routes/user.js");


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);


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
 