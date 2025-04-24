import mongoose from "mongoose";

const db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database is conneted");
    })
    .catch((e) => {
      console.log("Failed to connect to the Database");
    });
};

export { db };
