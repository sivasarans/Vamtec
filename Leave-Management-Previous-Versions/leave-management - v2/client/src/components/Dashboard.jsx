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
    return <div>Please log in to view the dashboard.</div>; // Show this message if no user is logged in
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <h1 className="text-2xl mb-4">Welcome, {user.name}!</h1>
      <p className="text-lg">User ID: {user.user_id}</p>
      <p className="text-lg">Role: {user.role}</p>

      {/* Buttons to navigate to different pages */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <NavLink 
          to="/UserRegister" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          User Register
        </NavLink>
        <NavLink 
          to="/Permission" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          Permission Form
        </NavLink>
        <NavLink 
          to="/LeaveForm" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          LeaveForm
        </NavLink>
        <NavLink 
          to="/Dashboard" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          Dashboard
        </NavLink>
        <NavLink 
          to="/LeaveStatus" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          LeaveStatus
        </NavLink>
        <NavLink 
          to="/PermissionStatus" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          PermissionStatus
        </NavLink>
        <NavLink 
          to="/admincalender" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          Calendar
        </NavLink>
        <NavLink 
          to="/LeaveAssign" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          LeaveAssign   
        </NavLink>
        <NavLink 
          to="/holidays" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          Holidays List
        </NavLink>
        <NavLink 
          to="/LeaveReports" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          LeaveReports
        </NavLink>
        <NavLink 
          to="/Attendance" 
          className="px-6 py-3 text-white text-xl bg-green-600 rounded-lg shadow-lg active:bg-green-700 active:translate-y-1 active:shadow-sm hover:bg-green-500 focus:outline-none">
          Attendance
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
