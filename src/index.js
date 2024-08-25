import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import userRouter from "./routes/userRoutes.js"
import studentRouter from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(userRouter);
app.use(studentRouter)

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);


  });
