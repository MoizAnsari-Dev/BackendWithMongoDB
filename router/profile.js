import express from "express";
import { authUser } from "../middleware/auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile", authUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

export { profileRouter };
