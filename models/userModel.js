import mongoose from "mongoose";
import validator from 'validator'
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
    trim: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email: " + value);
      }
    }
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
