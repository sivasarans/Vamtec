import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ReactComponent as ReactLogo } from './logo.svg'; // Assuming you have the React logo in your project
import Login from './components/Login';
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
import Attendance from './components/Attendance';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeNav(); // Close sidebar when logged out
  };

  const openNav = () => {
    setIsSidebarOpen(true);
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  };

  const closeNav = () => {
    setIsSidebarOpen(false);
    document.body.style.backgroundColor = "white";
  };

  return (
    <div className="App">
      <Router>
        {/* Sidebar */}
        {isLoggedIn && (
          <div
            id="mySidenav"
            className={`fixed inset-0 bg-gray-800 bg-opacity-90 transition-all duration-500 ease-in-out transform 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 
            sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4`}
            style={{ maxWidth: '250px' }} // Ensure enough width for sidebar content
          >
            <div className="flex justify-end p-4">
              <button onClick={closeNav} className="text-white text-3xl">&times;</button>
            </div>
            {/* Sidebar content */}
            <div className="flex flex-col space-y-4 p-4">
              <NavLink to="/UserRegister" className="text-white text-xl">User Register</NavLink>
              <NavLink to="/Permission" className="text-white text-xl">Permission Form</NavLink>
              <NavLink to="/LeaveRequest" className="text-white text-xl">Leave Request</NavLink>
              <NavLink to="/Dashboard" className="text-white text-xl">Dashboard</NavLink>
              <NavLink to="/admin-leave" className="text-white text-xl">Leave request (Admin)</NavLink>
              <NavLink to="/admin-permission" className="text-white text-xl">Permission request (Admin)</NavLink>
              <NavLink to="/admincalender" className="text-white text-xl">Calendar</NavLink>
              <NavLink to="/leaveassign" className="text-white text-xl">Leave Assign (Admin)</NavLink>
              <NavLink to="/holidays" className="text-white text-xl">Holidays List</NavLink>
              <NavLink to="/reports" className="text-white text-xl">Reports (Leave Status)</NavLink>
              <NavLink to="/Attendance" className="text-white text-xl">Attendance</NavLink>

              <button onClick={handleLogout} className="text-white text-xl mt-4">Logout</button>
            </div>
          </div>
        )}


                  {/* Navigation Bar */}
                  <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex space-x-4">
              {/* React Logo */}
              <NavLink to="/" className="text-white">
                <ReactLogo className="h-8 w-8" />
              </NavLink>
            </div>
            {/* Login / Logout Button */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded-md">Logout</button>
              ) : (
                <NavLink to="/login" className="px-4 py-2 bg-green-500 rounded-md">Login</NavLink>
              )}
            </div>
          </div>

        {/* Main Content */}
        <div id="main" className={`transition-all duration-500 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {/* Menu Button */}
          <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776; Menu</span>



          {/* Routes */}
          <Routes>
            <Route path="/" element={<Login onLogin={setIsLoggedIn} />} />
            <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
            <Route path="/Attendance" element={isLoggedIn ? <Attendance /> : <Login onLogin={setIsLoggedIn} />} />
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
        </div>
      </Router>
    </div>
  );
}

export default App;
