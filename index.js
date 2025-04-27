import express from "express";
import { db } from "./config/databse.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Seperate Routes for different requests
import { router } from "./router/authRouter.js";
import { profileRouter } from "./router/profile.js";
import { connectionRouter } from "./router/connectionRouter.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const Port = process.env.PORT || 3000;

app.use("/", router);
app.use("/", profileRouter);
app.use("/", connectionRouter);

app.listen(Port, async () => {
  await db();
  console.log(`Listening on ${Port}`);
});
