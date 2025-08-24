const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      enum: {
        values: ["Ignored", "Interested", "Accepted", "Rejected"],
        message: "{VALUE} is a incorrect status type",
      },
    },
  },
  {
    timestamps: true,
  }
);

const connectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
module.exports =  connectionRequestModel;
