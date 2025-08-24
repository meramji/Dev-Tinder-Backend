const express = require("express");

const requestRouter = express.Router();

const { userauth } = require("../middlewares/auth.js");

const ConnectionRequestModel = require("../models/connectionRequest.js");

requestRouter.post(
  "/request/send/:Status/:toUserId",
  userauth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const Status = req.params.Status;

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        Status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: "Connection request send sucessfully !!",
        data,
      });
    } catch (err) {
      res.status(400).send("Error :" + err.message);
    }
  }
);

module.exports = { requestRouter };
