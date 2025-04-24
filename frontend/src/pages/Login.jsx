import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4">🗝️ Login</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          className="block w-full mb-4 p-2 bg-gray-800 border border-gray-600 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="block w-full mb-4 p-2 bg-gray-800 border border-gray-600 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
