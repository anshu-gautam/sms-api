import mongoose from "mongoose";

const connectionParams = {
  useUnifiedTopology: true,
};

const connectDB = async () => {
  const db = process.env.MONGODB_URI;

  try {
    const conn = await mongoose.connect(db, connectionParams);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
