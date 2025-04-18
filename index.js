import express from "express";
import jwt from "jsonwebtoken";
import { UserModel, TodoModel } from "./database/db.js";
import { db } from "./utils/nongooseDB.js";

const JWT_SECRET = "12dshvkjn";
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
      email: email,
      password: password,
      name: name,
    });

    res.json({
      message: "You are loggedIn",
    });
  } catch (error) {
    res.json({
      message: "User Already Exsist",
    });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });

  console.log(user);

  if (user) {
    console.log({
        id: user._id.toString()
    });
    
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Data",
    });
  }
});
app.post("/todo", auth, (req, res) => {
  const userId = req.userId;
  res.json({
    userId: userId,
  });
});
app.get("/todos", auth, (req, res) => {
  const userId = req.userId;
  res.json({
    userId: userId,
  });
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decorded = jwt.verify(token, JWT_SECRET);

  if (decorded) {
    req.userId = decorded.Id;
    next();
  } else {
    res.json({
      message: "Can not Verify",
    });
  }
}

app.listen(4000, async () => {
  await db();
  console.log("Port is Live to continue to listen");
});
