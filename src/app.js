const express = require("express"); //importing express

const app = express(); //the server has been made.

const {adminauth,userauth} = require("./middlewares/auth.js");
app.use("/admin", adminauth);
app.get("/user",userauth, (req, res) => {  //if token in userauth does not match then it will send unauthorized request and if it matches it will send to next(),user send data response
  res.send("user data send");
});

app.get("/admin/getalldata", (req, res) => {
  res.send("all data sent");
});
app.get("/admin/deleteuser", (req, res) => {
  res.send("Deleted data");
});

app.listen(3000, () => {
  console.log("the server is sucessfully listening.");
}); //server is listening at port 3000.
