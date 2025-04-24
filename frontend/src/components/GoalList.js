import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GoalList() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/goals').then((res) => {
      setGoals(res.data);
    });
  }, []);

  return (
    <ul>
      {goals.map((goal, index) => (
        <li key={index}>
          {goal.title} - {goal.date} - {goal.progress}%
        </li>
      ))}
    </ul>
  );
}