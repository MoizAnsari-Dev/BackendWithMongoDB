import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    fromID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const connectionRequestModel = mongoose.model("ConnectionRequest", connectionSchema);

export{
    connectionRequestModel
}
