import mongoose from "mongoose";

const db = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/BackendWithMongoDB")
    .then(() => {
      console.log("MongoDB is Connected");
    })
    .catch((e) => {
      console.log("faild to Connect MongoDB");
    });
};

export { db };
