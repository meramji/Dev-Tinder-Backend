const express = require("express"); //importing express

const connectdb = require("./config/Database.js");

const app = express(); //the server has been made.

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
