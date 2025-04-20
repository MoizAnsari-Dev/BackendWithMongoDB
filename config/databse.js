import mongoose from "mongoose";

const db = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/TynderForDev")
    .then(() => {
      console.log("Database is conneted");
    })
    .catch((e) => {
      console.log("Failed to connect to the Database");
    });
};

export { db };
