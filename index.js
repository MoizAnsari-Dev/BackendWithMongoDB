import express from "express";
import { db } from "./config/databse.js";
import { userModel } from "./models/userModel.js";
import { validateSignupData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
import { authUser } from "./middleware/auth.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser())
const Port = process.env.PORT || 3000;
//Sginup
app.post("/signup", async (req, res) => {
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
//Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("Email is not Found");
    }
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (passwordValidation) {
      const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET)
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
//Profile called
app.get('/profile', authUser, async (req, res) => {
  try {
    const user = req.user
    res.send(user)
  res.send('Reading Cookies')
} catch (error) {
  res.status(400).send('Error: ' + error.message)
}
})

app.post('/sendconnection', authUser, async (req, res) => {
  console.log('Connection request send');
  res.send('Connection to the request')
});

app.listen(Port, async () => {
  await db();
  console.log(`Listening on ${Port}`);
});
