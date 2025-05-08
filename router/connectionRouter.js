import express from "express";
import { authUser } from "../middleware/auth.js";
import { connectionRequestModel } from "../models/connectionRequest.js";

const connectionRouter = express.Router();

connectionRouter.post(
  "/request/send/:status/:toID",
  authUser,
  async (req, res) => {
    try {
      const fromUser = req.user._id;
      const toUser = req.params.toID;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "invalid status types",
        });
      }

      const existingConnection = await connectionRequestModel.findOne({
        //MongoDB OR syntex $OR
        $or: [
          { fromID, toID },
          { fromID: toID, toID: fromID },
        ],
      });

      const connectionDetail = new connectionRequestModel({
        fromUser,
        toUser,
        status,
      });

      const dataConnection = await connectionDetail.save();
      res.json({
        message: "Connection Request send Successfully",
        dataConnection,
      });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  }
);

export { connectionRouter };
