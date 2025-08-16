const express = require("express"); //importing express

const app = express(); //the server has been made.


app.get("/getuserdata", (req, res) => {
  try {
    //logic of logic call and get user data

    throw new Error("gswduiu");
    res.send("user data sent");
  } catch (err) {
    res.status(500).send("contact your support team");
  }
});

app.use("/", (err, req, res, next) => {
  // if(err){
  res.status(500).send("something went wrong");  // it catches the error ,it is error handler.
  // }
});


app.listen(3000, () => {
  console.log("the server is sucessfully listening.");
}); //server is listening at port 3000.
