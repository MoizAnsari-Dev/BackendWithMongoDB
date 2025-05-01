import express from "express";
import { authUser } from "../middleware/auth.js";
import { validateProfileData } from "../utils/validation.js";

const profileRouter = express.Router();

profileRouter.get("/profile", authUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/edit", authUser, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid Edit Request!!");
    }
    const loggedin = req.user;
    Object.keys(req.body).forEach((key) => loggedin[key] = req.body[key]);
    console.log(loggedin);
    await loggedin.save()
    res.send(`${loggedin.firstName} , you are updated`)
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

export { profileRouter };
