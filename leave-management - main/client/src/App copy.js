import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard_home';
import LeaveRequestForm from './components/leave_requests';
import PermissionForm from './components/PermissionForm';
import UserRegisterForm from './components/UserRegisterForm';
import LeaveRequests from './components/leavestatus';
import PermissionRequests from './components/PermissionRequests';
import AdminCalendar from './components/AdminCalendar';
import LeaveAssignmentForm from './components/LeaveAssignmentForm';
import HolidayCalendar from './components/HolidayCalendar';
import DownloadButton from './components/reports';

import axios from 'axios';

function Login({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    try {
      // Sending the login request with axios
      const response = await axios.post('http://localhost:5000/login', {
        user_id: userId,
        password: password,
      });

      // Check if the response is successful
      if (response.status === 200) {
        const data = response.data;
        onLogin(true); // Mark user as logged in
        navigate('/LeaveRequest'); // Redirect to Dashboard
      }
    } catch (err) {
      // Handle errors from the server or network
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.error || 'Login failed. Please try again.');
      } else {
        // Network or other errors
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        {/* Navigation Bar */}
        <div 
        className="flex justify-between items-center p-4 bg-gray-800 text-white"
        >
          <div className="flex space-x-4">
            {isLoggedIn && (
              <>
                <NavLink
                  to="/UserRegister"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  User Register
                </NavLink>
                <NavLink
                  to="/Permission"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Permission Form
                </NavLink>
                <NavLink
                  to="/LeaveRequest"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Leave Request
                </NavLink>
                <NavLink
                  to="/Dashboard"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin-leave"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Leave request (Admin)
                </NavLink>
                <NavLink
                  to="/admin-permission"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Permission request (Admin)
                </NavLink>
                <NavLink
                  to="/admincalender"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Calendar
                </NavLink>
                <NavLink
                  to="/leaveassign"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Leave Assign (Admin)
                </NavLink>
                <NavLink
                  to="/holidays"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Holidays List
                </NavLink>
                <NavLink
                  to="/reports"
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                  activeClassName="bg-blue-700"
                >
                  Reports (Leave Status)
                </NavLink>
              </>
            )}
          </div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
          <Route path="/Dashboard" element={isLoggedIn ? <Dashboard /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/UserRegister" element={isLoggedIn ? <UserRegisterForm /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/Permission" element={isLoggedIn ? <PermissionForm /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/LeaveRequest" element={isLoggedIn ? <LeaveRequestForm /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/admin-leave" element={isLoggedIn ? <LeaveRequests /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/admin-permission" element={isLoggedIn ? <PermissionRequests /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/admincalender" element={isLoggedIn ? <AdminCalendar /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/leaveassign" element={isLoggedIn ? <LeaveAssignmentForm /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/holidays" element={isLoggedIn ? <HolidayCalendar /> : <Login onLogin={setIsLoggedIn} />} />
          <Route path="/reports" element={isLoggedIn ? <DownloadButton /> : <Login onLogin={setIsLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
