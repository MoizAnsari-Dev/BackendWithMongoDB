import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  age: {
    type: Number,
    min: 18
  },
  gender: String,
  bio: {
    type: String,
    default: "Hi, I'm the part of this worlds"
  },
  photoURL: {
    type: String,
  },
  skills: {
    type: [String]
  }
}, {
  timestamps: true
});

const userModel = mongoose.model("User", userSchema);

export { userModel };
