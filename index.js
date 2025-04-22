import express from "express";
import { db } from "./config/databse.js";
import { userModel } from "./models/userModel.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
const Port = process.env.PORT || 3000;
//Sginup
app.post("/signup", async (req, res) => {
  try {
    if (
      req.body.firstName.length === 0 ||
      req.body.lastName.length === 0 ||
      req.body.password.length === 0 ||
      req.body.email.length === 0
    ) {
      res.send("Can not be empty fill it again");
    }
    console.log(req.body);

    const user = new userModel(req.body);

    await user.save();

    res.send("User Successfully registred");
  } catch (error) {
    res.send("User already Exist!!");
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
    res.send("User Not Found");
  }
});
//User feed
app.get("/feed", async (req, res) => {
  try {
    const user = await userModel.find({});
    res.send(user);
  } catch (error) {
    res.send("SomeThing went worng");
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
    res.status(404).send("Something Went Wrong with your side");
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
    res.send("SomeThing went Worng");
  }
});

app.listen(Port, async () => {
  await db();
  console.log(`Listening on ${Port}`);
});
