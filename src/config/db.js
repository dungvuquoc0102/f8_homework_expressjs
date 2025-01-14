import mongoose from "mongoose";
import User from "../models/User.js";

const connectDB = async () => {
  try {
    //connect to db
    const res = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    //index for User model
    await User.syncIndexes();
    console.log("Connecting state to MongoDB: ", res.connections[0].readyState);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
