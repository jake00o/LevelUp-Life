import Goal from '../models/Goal.js';

export const getGoals = async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
};

export const addGoal = async (req, res) => {
  const { title, date, progress } = req.body;
  const newGoal = new Goal({ title, date, progress });
  await newGoal.save();
  res.status(201).json(newGoal);
};