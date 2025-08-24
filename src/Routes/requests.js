const express = require("express");

const requestRouter = express.Router();

const { userauth } = require("../middlewares/auth.js");

const connectionRequest= require("../models/connectionRequest.js");

requestRouter.post(
  "/request/send/:Status/:toUserId",
  userauth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const Status = req.params.Status;

      const allowedStatus = ["Interested", "Ignored"];
      if (!allowedStatus.includes(Status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type:  " + Status });
      }

      const existingConnectionRequest=await connectionRequest.findOne({
        $or:[
          {fromUserId,toUserId},
          {fromUserId:toUserId,toUserId:fromUserId},
        ]
      });
      if(existingConnectionRequest){
        return res.status(400).json({message:"connection request already exists!"});
      }

      const connectionRequest = new ConnectionRequest({
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
