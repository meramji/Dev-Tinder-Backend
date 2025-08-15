const express = require("express"); //importing express

const app = express(); //the server has been made.

app.use("/user", (req, res, next) => {
  console.log("1st response");
  // res.send("response!!");
  next();
});
app.get("/user", (req, res, next) => {
  console.log("2nd response");
  res.send("response!!");//if we do not write res.send then it will give error did not get /user .
  next(); //if we did not write  next and res.send then it will no in infinity loop and do not print.
});

app.listen(3000, () => {
  console.log("the server is sucessfully listening.");
}); //server is listening at port 3000.
