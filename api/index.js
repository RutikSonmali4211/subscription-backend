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
config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import userRouter from "../routes/user.js";
import saladRouter from "../routes/salads.js";
import subscriptionRouter from "../routes/subscription.js";
import serverless from "serverless-http"; // 👈 Important!

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Mongo Connection
let isConnected = false;
const connectToMongo = async () => {
  if (!isConnected) {
    await mongoose.connect("mongodb://localhost:27017/subscription_management");
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
};

app.use(async (req, res, next) => {
  await connectToMongo();
  next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/salad", saladRouter);
app.use("/api/subscription", subscriptionRouter);

// Default Route (handle "/")
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 👇 Export as a Vercel serverless handler
export default serverless(app);
