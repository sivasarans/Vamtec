import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Fetch user details from localStorage when the component mounts
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUser(storedUserDetails); // Set user details if available
    }
  }, []);

  if (!user) {
    return <div className="text-center text-lg font-semibold text-gray-600">Please log in to view the dashboard.</div>; // Show this message if no user is logged in
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Welcome, {user.name}!</h1>
        <p className="text-lg text-gray-600 mt-2">User ID: {user.user_id}</p>
        <p className="text-lg text-gray-600">Role: {user.role}</p>
      </div>

      {/* Buttons to navigate to different pages */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {user.role === "Admin" ? (
          // Admin role buttons
          <>
            <NavLink 
              to="/UserRegister" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              User Register
            </NavLink>
            <NavLink 
              to="/LeaveStatus" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              Leave
            </NavLink>
            <NavLink 
              to="/PermissionStatus" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              Permission
            </NavLink>
            <NavLink 
              to="/admincalender" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              Calendar
            </NavLink>
            <NavLink 
              to="/LeaveAssign" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              LeaveAssign
            </NavLink>
            <NavLink 
              to="/LeaveReports" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              LeaveReports
            </NavLink>
            <NavLink 
              to="/Attendance" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              Attendance
            </NavLink>
          </>
        ) : (
          // Non-admin role buttons
          <>
            <NavLink 
              to="/LeaveStatus" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              Leave
            </NavLink>
            <NavLink 
              to="/PermissionStatus" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              Permission
            </NavLink>
            <NavLink 
              to="/admincalender" 
              className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg hover:bg-green-500 transform transition-transform duration-200 active:scale-95">
              Calendar
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
