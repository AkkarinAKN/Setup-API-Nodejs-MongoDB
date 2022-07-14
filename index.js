import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import serviceRoute from "./routes/Service.js";
import carRoute from "./routes/Car.js";
import adminRoute from "./routes/Admin.js";

import cors from "cors";

const app = express();
dotenv.config();

const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.MOGO);
    console.log("Connected to mogoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewere
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/service", serviceRoute);
app.use("/api/car", carRoute);
app.use("/api/admin", adminRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something is wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(3030, () => {
  connectMongoDB();
  console.log("Connected to Carbooking Back-end");
});
