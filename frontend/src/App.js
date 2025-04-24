// Core React imports and Axios for API calls
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // App-level states for form and goal data
  const [goals, setGoals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ title: '', date: '', progress: 0 });
  const [showHistory, setShowHistory] = useState(true); // For toggling goal history view

  // Fetch goals from backend on first render
  useEffect(() => {
    fetchGoals();
  }, []);

  // Fetch goals from Express API
  const fetchGoals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/goals');
      setGoals(res.data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
    }
  };

  // Handle input changes (convert progress slider to number)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value,
    }));
  };

  // Handle form submission: convert minutes to readable format
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mins = formData.progress;
    const progressText =
      mins < 60
        ? `${mins} minutes`
        : mins % 60 === 0
        ? `${mins / 60} hours`
        : `${(mins / 60).toFixed(1)} hours`;

    try {
      await axios.post('http://localhost:5000/api/goals', {
        title: formData.title,
        date: formData.date,
        progress: progressText,
      });
      fetchGoals(); // Refresh goals
      setFormData({ title: '', date: '', progress: 0 }); // Reset form
    } catch (err) {
      console.error('❌ Failed to add goal:', err);
    }
  };

  // Show/Hide toggle for history
  const toggleHistory = () => setShowHistory((prev) => !prev);

  // Filtered goals based on search bar
  const filteredGoals = goals.filter(goal =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.date.includes(searchTerm)
  );

  // Calculate total minutes from different formats
  const totalMinutes = goals.reduce((acc, goal) => {
    const match = goal.progress.match(/(\d+\.?\d*)/);
    const number = match ? parseFloat(match[1]) : 0;
    if (/hour/i.test(goal.progress)) {
      return acc + number * 60;
    } else if (/minute/i.test(goal.progress)) {
      return acc + number;
    } else return acc;
  }, 0);

  const today = new Date().toISOString().split("T")[0];

  // Format slider value for display
  const formattedProgress =
    formData.progress < 60
      ? `${formData.progress} minutes`
      : formData.progress % 60 === 0
      ? `${formData.progress / 60} hours`
      : `${(formData.progress / 60).toFixed(1)} hours`;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', background: '#0e0e16', minHeight: '100vh', color: '#fff' }}>
      {/* Title */}
      <h1 style={{ textAlign: 'center', color: '#64b5f6', fontSize: '2.5rem', textShadow: '0 0 12px #64b5f6' }}>📈 LevelUp Life</h1>
      <h3 style={{ textAlign: 'center', color: '#fff' }}>Your Goals</h3>

      {/* Toggle history button */}
      <button onClick={toggleHistory} style={buttonStyle}>
        {showHistory ? '🔽 Hide History' : '📜 View History'}
      </button>

      {/* Search input */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by title or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Add goal form */}
      <form onSubmit={handleSubmit} style={{ margin: '1rem auto', maxWidth: '500px' }}>
        <input type="text" name="title" placeholder="Goal Title" value={formData.title} onChange={handleInputChange} required style={inputStyle} />
        <input type="date" name="date" min={today} value={formData.date} onChange={handleInputChange} required style={{ ...inputStyle, colorScheme: 'dark' }} />

        {/* Progress label + slider */}
        <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Time</label>
        <div style={{ marginBottom: '10px', color: '#64ffda', fontWeight: 'bold', textAlign: 'center' }}>
          {formattedProgress}
        </div>
        <input type="range" name="progress" min="0" max="2880" step="15" value={formData.progress} onChange={handleInputChange} style={{ width: '100%' }} />

        <button type="submit" style={buttonStyle}>Add Goal</button>
      </form>

      {/* Total tracked time summary */}
      <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#00e676' }}>
        🔥 Total Tracked Time: {
          `${Math.floor(totalMinutes / 43200)} months ${Math.floor((totalMinutes % 43200) / 1440)} days ${Math.floor((totalMinutes % 1440) / 60)} hours ${totalMinutes % 60} minutes`
        }
      </p>

      {/* History table */}
      {showHistory && (
        filteredGoals.length === 0 ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>No goals found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ background: '#1f2635' }}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {filteredGoals.map((goal, index) => (
                <tr key={index} style={{ textAlign: 'center', borderBottom: '1px solid #333' }}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{goal.title}</td>
                  <td style={tdStyle}>{goal.date}</td>
                  <td style={{ ...tdStyle, color: '#64ffda', fontWeight: 'bold' }}>{goal.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

// 🔧 Reusable styles
const thStyle = {
  padding: '12px',
  fontSize: '16px',
  fontWeight: 'bold'
};

const tdStyle = {
  padding: '10px',
  fontSize: '15px'
};

const tableStyle = {
  margin: '2rem auto',
  borderCollapse: 'collapse',
  width: '80%',
  background: '#181c28',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 0 12px rgba(100, 181, 246, 0.3)'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #333',
  backgroundColor: '#1e1e2f',
  color: '#eee'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#4a90e2',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  fontSize: '15px',
  cursor: 'pointer',
  boxShadow: '0 0 10px #4a90e2'
};

export default App;
