import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    //Read user through Token
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid TOKEN try again");
    }
    //Validate the token

    const decordedToken = await jwt.verify(token, process.env.JWT_SECRET);
    //find the user
    const { _id } = decordedToken;
    const user = await userModel.findById(_id);
    if (!user) {
      throw new Error("Error can not find User ID");
    }
    req.user = user
    next();
  } catch (error) {
    res.status(404).send("Error:" + error.message);
  }
};

export { authUser };
