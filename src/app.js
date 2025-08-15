const express = require("express"); //importing express

const app = express(); //the server has been made.

app.use(
  "/user",
  (req, res, next) => {
    console.log("1st response");
    // res.send("response!!");
    next();
  },
  (req, res, next) => {
    console.log("2nd response");
    // res.send("this is 2 response");
    next();
  },
  (req, res, next) => {
    console.log("3rd response");
    // res.send("this is 3 response");
    next();
  },
  (req, res, next) => {
    console.log("4nd response");
    res.send("this is 4 response");
  }
);

app.listen(3000, () => {
  console.log("the server is sucessfully listening.");
}); //server is listening at port 3000.
