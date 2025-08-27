const express = require("express");

const userRouter = express.Router();

const { userauth } = require("../middlewares/auth.js");

const ConnectionRequest = require("../models/connectionRequest.js");

//getting all the pending connection requests for the loggedIn User .

userRouter.get("/user/requests/received", userauth, async (req, res) => {
  try {
    loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstname lastname photourl age about  gender  skills"
    );

    res.json({
      message: "Data fetched successfully !!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});


module.exports = userRouter;
