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
      
    } else {
      
    }
  } catch (error) {
    
  }
})

export { profileRouter };
