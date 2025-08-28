const mongoose = require("mongoose");
const fs = require("fs");

// Schema
const cropSchema = new mongoose.Schema({
  N: Number,
  P: Number,
  K: Number,
  temperature: Number,
  humidity: Number,
  ph: Number,
  rainfall: Number,
  label: String
});

const Crop = mongoose.model("Crop", cropSchema);

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Read dataset
    const data = JSON.parse(fs.readFileSync("crops.json", "utf-8"));

    // Clear existing + insert new
    await Crop.deleteMany({});
    await Crop.insertMany(data);

    console.log(`🌱 Inserted ${data.length} crop records`);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
}

seedData();
