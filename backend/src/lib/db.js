import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new error("db url is not defined on env variables");
    }
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("connect to MongoDB", conn.connection.host);
  } catch (error) {
    console.log("Error Connecting to Mongodb", error);
    process.exit(1);
  }
};
