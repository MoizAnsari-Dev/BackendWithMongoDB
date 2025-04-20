import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  age: Number,
  gender: String,
});

const userModel = mongoose.model("User", userSchema);

export { userModel };
