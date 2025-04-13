// import { config } from "dotenv";
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import helmet from "helmet";
// import userRouter from "../routes/user.js";
// import saladRouter from "../routes/salads.js";
// import subscriptionRouter from "../routes/subscription.js";

// config();

// const startServer = async () => {
//     const app = express();

//     app.use(cors());
//     app.use(express.json());
//     app.use(helmet());

//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Connected to MongoDB");

//     app.use("/api/user", userRouter);
//     app.use("/api/salad", saladRouter);
//     app.use("/api/subscription", subscriptionRouter);

//     app.listen(process.env.PORT, () => {
//         console.log(`Server running on port ${process.env.PORT}`);
//     });
// }


// startServer();
import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

import userRouter from '../routes/user.js';
import saladRouter from '../routes/salads.js';
import subscriptionRouter from '../routes/subscription.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

app.use('/api/user', userRouter);
app.use('/api/salad', saladRouter);
app.use('/api/subscription', subscriptionRouter);


app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get('/favicon.ico', (req, res) => res.status(204));

const handler = serverless(app);

export default async function mainHandler(req, res) {
  await connectToDatabase();
  return handler(req, res);
}