import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  title: String,
  date: String,
  progress: String
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
