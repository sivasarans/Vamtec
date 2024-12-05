import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ReactComponent as ReactLogo } from './logo.svg';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LeaveForm from './components/LeaveForm';
import Permission from './components/Permission';
import UserRegister from './components/UserRegister';
import LeaveStatus from './components/LeaveStatus';
import PermissionStatus from './components/PermissionStatus';
import AdminCalendar from './components/AdminCalendar';
import LeaveAssign from './components/LeaveAssign';
import HolidayCalendar from './components/HolidayCalendar';
import LeaveReports from './components/LeaveReports';
import Attendance from './components/Attendance';
import Sidebar from './components/Sidebar';

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

  const handleLinkClick = () => {
    closeNav();
  };

  return (
    <div className="App">
      <Router>
        {/* Sidebar: Only shown when logged in */}
        {isLoggedIn && (
          <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            closeNav={closeNav} 
            openNav={openNav} 
            handleLinkClick={handleLinkClick} 
          />
        )}

        {/* Navigation Bar */}
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="flex space-x-4">
            {/* React Logo */}
            <NavLink to="/Dashboard" className="text-white">
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
          {/* Menu Button: Only shown when logged in */}
          {isLoggedIn && (
            <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>
              &#9776; Menu
            </span>
          )}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Login onLogin={setIsLoggedIn} />} />
            <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
            <Route path="/Attendance" element={isLoggedIn ? <Attendance /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/Dashboard" element={isLoggedIn ? <Dashboard /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/UserRegister" element={isLoggedIn ? <UserRegister /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/Permission" element={isLoggedIn ? <Permission /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/LeaveForm" element={isLoggedIn ? <LeaveForm /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/LeaveStatus" element={isLoggedIn ? <LeaveStatus /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/PermissionStatus" element={isLoggedIn ? <PermissionStatus /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/admincalender" element={isLoggedIn ? <AdminCalendar /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/LeaveAssign" element={isLoggedIn ? <LeaveAssign /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/holidays" element={isLoggedIn ? <HolidayCalendar /> : <Login onLogin={setIsLoggedIn} />} />
            <Route path="/LeaveReports" element={isLoggedIn ? <LeaveReports /> : <Login onLogin={setIsLoggedIn} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
