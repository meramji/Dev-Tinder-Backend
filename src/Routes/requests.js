const express = require("express");

const requestRouter = express.Router();

const { userauth } = require("../middlewares/auth.js");

const ConnectionRequest = require("../models/connectionRequest.js");

const User = require("../models/user.js");

const mongoose = require("mongoose");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userauth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type:  " + status });
      }

      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ message: "Invalid user ID!" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "user not found !" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "connection request already exists!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "you have " + status + req.user.firstname + "profile",
        data,
      });
    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userauth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "status is not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: "connection request " + status });
    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  }
);

module.exports = { requestRouter };
