const express = require("express");

const requestRouter = express.Router();

const { userauth } = require("../middlewares/auth.js");

requestRouter.post("/sendconnectionrequest", userauth, async (req, res) => {
  const user = req.user;

  console.log("connection request send");

  res.send(user.firstname + "send the request");
});

module.exports = { requestRouter };
