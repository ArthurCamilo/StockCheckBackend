import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

const { DB_URI } = process.env;

const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect(DB_URI || "");
};

export { connectToDatabase };