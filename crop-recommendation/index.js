// index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mealRoutes from "./routes/mealRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/meals", mealRoutes);

//Connect to MongoDB (cleaner way for v4+ driver)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
