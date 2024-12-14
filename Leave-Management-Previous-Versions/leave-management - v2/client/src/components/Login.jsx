import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', { user_id: userId, password });

      if (response.status === 200) {
        const { user } = response.data;
        setUserDetails(user);
        onLogin(true);
        localStorage.setItem('userDetails', JSON.stringify(user));
        navigate('/Attendance');
      }
    } catch (err) {
      setError(err.response?.data.error || 'Login failed.');
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-gray-200"
      style={{ backgroundImage: 'url(/background_login.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="text-2xl mb-4 text-white">Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
}

export default Login;
