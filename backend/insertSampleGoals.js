import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Goal from './models/Goal.js'; // ✅ Make sure model is named `Goal`

dotenv.config();

const sampleGoals = [
  { title: "Reading", date: "2025-04-21", progress: "40 minutes" },
  { title: "Workout", date: "2025-04-21", progress: "60 minutes" },
  { title: "Meditation", date: "2025-04-22", progress: "25 minutes" },
  { title: "Complete Assignment", date: "2025-04-22", progress: "70 minutes" },
  { title: "Grocery Shopping", date: "2025-04-23", progress: "50 minutes" },
  { title: "Study JavaScript", date: "2025-04-23", progress: "80 minutes" },
  { title: "Clean the House", date: "2025-04-24", progress: "90 minutes" },
  { title: "Call Family", date: "2025-04-24", progress: "100 minutes" },
  { title: "Learn React.js", date: "2025-04-25", progress: "30 minutes" },
  { title: "Write Blog Post", date: "2025-04-25", progress: "60 minutes" },
  { title: "Plan Weekend", date: "2025-04-26", progress: "10 minutes" },
  { title: "Watch Tutorial", date: "2025-04-26", progress: "45 minutes" },
  { title: "Practice Drawing", date: "2025-04-27", progress: "55 minutes" },
  { title: "Organize Desk", date: "2025-04-27", progress: "85 minutes" },
  { title: "Social Media Limit", date: "2025-04-28", progress: "15 minutes" },
  { title: "Sleep 8 hours", date: "2025-04-28", progress: "100 minutes" },
  { title: "Drink 2L Water", date: "2025-04-29", progress: "50 minutes" }
];

async function insertGoals() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Goal.deleteMany(); // Clear old goals
    await Goal.insertMany(sampleGoals); // Insert new ones
    console.log("✅ Sample goals inserted with 'minutes'");
    process.exit();
  } catch (error) {
    console.error("❌ Insertion failed:", error);
    process.exit(1);
  }
}

insertGoals();
