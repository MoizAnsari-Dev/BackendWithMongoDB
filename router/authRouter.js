import express from 'express'
import bcrypt from 'bcrypt';
import { validateSignupData } from '../utils/validation.js';
import { userModel } from '../models/userModel.js';

const router = express.Router()

router.post("/signup", async (req, res) => {
  try {
    //Validation Data
    validateSignupData(req);
    //Encript Password
    const { firstName, lastName, password, email, age, bio, skills } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //Creating Data
    const user = new userModel({
      firstName,
      lastName,
      email,
      bio,
      age,
      skills,
      password: passwordHash,
    });

    console.log(passwordHash);
    await user.save();

    res.send("User Successfully registred");
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("Email is not Found");
    }
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (passwordValidation) {
      const token = await user.getJWT()
      console.log(token);

      res.cookie("token", token);
      
      res.send("User Successfully login");
    } else {
      throw new Error("password is incorrect");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

export {
    router
}