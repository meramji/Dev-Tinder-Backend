const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromuserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ToUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    Status: {
      type: String,
      required: true,
      enum: {
        values: ["Ignored", "Interested", "Accepted", "Rejected"],
        message: `${value} is a incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequestModel = new mongoose.model(
  "connectionRequestModel",
  "connectionRequestSchema"
);
module.exports = { ConnectionRequestModel };
