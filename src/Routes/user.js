const express = require("express");

const userRouter = express.Router();

const { userauth } = require("../middlewares/auth.js");

const ConnectionRequest = require("../models/connectionRequest.js");

const USER_SAFE_DATA = "firstname lastname photourl age gender skills about";
//getting all the pending connection requests for the loggedIn User .

userRouter.get("/user/requests/received", userauth, async (req, res) => {
  try {
    loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully !!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

userRouter.get("/user/connections", userauth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;
