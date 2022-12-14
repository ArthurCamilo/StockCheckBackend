import mongoose from 'mongoose';
import dotenv from 'dotenv';

mongoose.Promise = global.Promise;
dotenv.config();

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;

const connectToDatabase = async (): Promise<void> => {
  await mongoose.connect("mongodb+srv://stockcheck:X5yEzGu6LfYUNr2A@cluster0.ul0yuxb.mongodb.net/stockcheck?retryWrites=true&w=majority");
};

export { connectToDatabase };