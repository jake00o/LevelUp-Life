import { useState } from 'react';
import axios from 'axios';

export default function AddGoalForm() {
  const [goal, setGoal] = useState({ title: '', date: '', progress: 0 });

  const handleChange = (e) => setGoal({ ...goal, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/goals', goal);
    setGoal({ title: '', date: '', progress: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Goal" value={goal.title} onChange={handleChange} />
      <input name="date" type="date" value={goal.date} onChange={handleChange} />
      <input name="progress" type="number" value={goal.progress} onChange={handleChange} />
      <button type="submit">Add Goal</button>
    </form>
  );
}