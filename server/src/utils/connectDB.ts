import mongoose, { Error } from "mongoose";
import { logger } from "./logging";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      logger.error("Mongo URL not present.");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    logger.error(
      "Error connecting to MongoDB:",
      error instanceof Error ? error : new Error("Looks like something went wrong"),
    );
    process.exit(1);
  }
};

export default connectDB;
