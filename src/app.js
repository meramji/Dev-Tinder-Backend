const express = require("express"); //importing express

const app = express(); //the server has been made.

// this will match all the http method APi call.
app.use("/user", (req, res) => {
  res.send("helo sb badhiya"); // now this will be executed for every /user beacuse its route matches first and this will be  apply on all /user route.
});

// this will happen when we get from server
app.get("/user", (req, res) => {
  res.send({ firstname: "hello", secondname: "kaise ho sb" });
});

//this will happen when we post data to the server
app.post("/user", (req, res) => {
  //saving data to the server.
  res.send("data saving successfully");
});

app.delete("/user", (req, res) => {
  res.send("data deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("hello from the server.");
});

app.listen(3000, () => {
  console.log("the server is sucessfully listening.");
}); //server is listening at port 3000.
