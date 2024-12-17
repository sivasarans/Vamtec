import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import EmployeeLeaveCalendar from './EmployeeLeaveCalendar';
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
      {/* <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Welcome, {user.name}!</h1>
        <p className="text-lg text-gray-600 mt-2">User ID: {user.user_id}</p>
        <p className="text-lg text-gray-600">Role: {user.role}</p>
      </div> */}
      

      {/* Grid layout for large buttons */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {user.role === "Admin" ? (
          <>
            <NavLink to="/UserRegister" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
              User Register
            </NavLink>
            <NavLink to="/LeaveStatus" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
              Leave
            </NavLink>
            <NavLink to="/PermissionStatus" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
              Permission
            </NavLink>
            <NavLink to="/admincalender" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200">
              Calendar
            </NavLink>
            <NavLink to="/LeaveAssign" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
              LeaveAssign
            </NavLink>
            <NavLink to="/LeaveReports" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-green-400 to-blue-600 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
              LeaveReports
            </NavLink>
            <NavLink to="/Attendance" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-red-100">
              Attendance
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/LeaveStatus" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
              Leave
            </NavLink>
            <NavLink to="/PermissionStatus" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-green-400 to-blue-600 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200">
              Permission
            </NavLink>
            <NavLink to="/EmployeeLeaveCalendar" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200">
              Calendar
            </NavLink>
            <NavLink to="/Attendance" className="relative inline-flex items-center justify-center p-6 mb-4 text-xl font-medium text-white bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 rounded-lg hover:text-white focus:ring-4 focus:outline-none focus:ring-red-100">
              Attendance
            </NavLink>
            <div>
              <EmployeeLeaveCalendar/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
