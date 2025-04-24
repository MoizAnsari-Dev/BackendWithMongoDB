import express from "express";
import { db } from "./config/databse.js";
import { userModel } from "./models/userModel.js";
import { validateSignupData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
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
      res.send("User Successfully login");
    } else {
      throw new Error("password is incorrect");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

//Finding the User
app.get("/user", async (req, res) => {
  try {
    const UserId = req.body.email;
    const findUser = await userModel.find({ email: UserId });
    if (findUser.length === 0) {
      res.send("User cant found");
    } else {
      res.send(findUser);
    }
  } catch (error) {
    res.status().send("User Not Found " + error.message);
  }
});
//User feed
app.get("/feed", async (req, res) => {
  try {
    const user = await userModel.find({});
    res.send(user);
  } catch (error) {
    res.status(400).send("SomeThing went worng " + error.message);
  }
});
//Deleting the User
app.delete("/user", async (req, res) => {
  const user = req.body._id;
  try {
    if (!(await userModel.findById({ _id: user }))) {
      res.send("Invalid UserId Cheack the iD");
    } else {
      const findUser = await userModel.findByIdAndDelete(user);
      res.send("User successfully deleted");
    }
  } catch (error) {
    res
      .status(400)
      .send("Something Went Wrong with your side " + error.message);
  }
});
//updating the User
app.patch("/user", async (req, res) => {
  try {
    const user = req.body._id;
    const userData = req.body;
    await userModel.findByIdAndUpdate(user, userData);
    res.send("User Successfully Updated");
  } catch (error) {
    res.status(400).send("SomeThing went Worng" + error.message);
  }
});

app.listen(Port, async () => {
  await db();
  console.log(`Listening on ${Port}`);
});
