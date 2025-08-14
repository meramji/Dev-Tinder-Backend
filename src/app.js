const express = require("express"); //importing express

const app = express(); //the server has been made.

app.get("/user/:userid/:password/:place", (req, res) => {
  console.log(req.params); //dynamic route
  res.send({ firstname: "hello", secondname: "kaise ho sb" });
});

app.listen(3000, () => {
  console.log("the server is sucessfully listening.");
}); //server is listening at port 3000.
