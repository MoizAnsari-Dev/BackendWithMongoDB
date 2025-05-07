import mongoose from "mongoose";
import validator from 'validator'
import jwt from 'jsonwebtoken';

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
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    message: `{VALUE} is not a valid gender`
  },
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

userSchema.methods.getJWT = async function () {
  const user = this;
  
  const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
  return token;
}

const userModel = mongoose.model("User", userSchema);

export { userModel };
