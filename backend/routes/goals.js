import express from 'express';
import Goal from '../models/Goal.js';

const router = express.Router();

// GET all goals from the database
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find(); // Fetch all goal documents
    res.json(goals); // Send the array as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Internal server error
  }
});

// POST a new goal to the database
router.post('/', async (req, res) => {
  try {
    const { title, date, progress } = req.body; // Destructure input from request body
    const newGoal = new Goal({ title, date, progress }); // Create new Goal instance
    await newGoal.save(); // Save the goal to MongoDB
    res.status(201).json(newGoal); // Respond with the saved goal
  } catch (err) {
    res.status(400).json({ error: err.message }); // Bad request or validation error
  }
});

export default router;
