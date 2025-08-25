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
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is a incorrect status type",
      },
    },
  },
  {
    timestamps: true,
  }
);

//  new mongoose.model(
//   "connectionRequest",
//   connectionRequestSchema
// );
// module.exports =  connectionRequestModel;

module.exports = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);
