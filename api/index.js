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

import { config } from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import userRouter from "../routes/user.js";
import saladRouter from "../routes/salads.js";
import subscriptionRouter from "../routes/subscription.js";

config();

const app = express();

// Setup middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

// Connect MongoDB once
let isConnected = false;
const connectToMongo = async () => {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
};

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  await connectToMongo();
  next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/salad", saladRouter);
app.use("/api/subscription", subscriptionRouter);

// Export the app for Vercel to use as a serverless function
export default app;
