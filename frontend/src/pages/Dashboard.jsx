import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: token }
    }).then(res => setUser(res.data));

    axios.get('http://localhost:5000/api/users/leaderboard')
      .then(res => setLeaderboard(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-4xl font-bold text-center text-indigo-500 mb-8">⚔️ Welcome to LevelUp Life</h1>

      {user && (
        <div className="mb-10 text-center">
          <p className="text-lg">🧙 Username: <span className="text-purple-400">{user.username}</span></p>
          <p className="text-lg">🎖️ Level: <span className="text-yellow-400">{user.level}</span></p>
          <p className="text-lg">🔋 XP: <span className="text-green-400">{user.xp}</span></p>
          <p className="text-lg">🏅 Rank: <span className="text-blue-400">{user.rank}</span></p>

          {/* Glowing XP Bar */}
          <div className="mt-4 w-full max-w-md mx-auto bg-gray-800 border border-indigo-600 rounded-full h-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(user.xp, 100)}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
            />
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4 text-pink-400">🏆 Leaderboard</h2>
        <table className="w-full bg-gray-900 border border-gray-700 rounded-lg">
          <thead className="bg-gray-800 text-indigo-300">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Username</th>
              <th className="p-2">Level</th>
              <th className="p-2">XP</th>
              <th className="p-2">Rank</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((u, i) => (
              <tr key={u._id} className="text-center border-t border-gray-700">
                <td className="p-2">{i + 1}</td>
                <td className="p-2 text-purple-300">{u.username}</td>
                <td className="p-2 text-yellow-300">{u.level}</td>
                <td className="p-2 text-green-300">{u.xp}</td>
                <td className="p-2 text-blue-300">{u.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
