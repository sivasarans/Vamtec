import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ReactComponent as ReactLogo } from './logo.svg'; // Assuming you have the React logo in your project
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidenavRef = useRef(null);

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

  const handleClickOutside = (event) => {
    // Close sidenav if click is outside the sidenav
    if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
      closeNav();
    }
  };

  const handleLinkClick = () => {
    // Close sidenav when a menu item is clicked
    closeNav();
  };

  // Attach event listener on mount and clean up on unmount
  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="App">
      <Router>
        {/* Sidebar */}
        {isLoggedIn && (
          <div
            ref={sidenavRef}
            id="mySidenav"
            className={`fixed inset-0 bg-gray-800 bg-opacity-90 transition-all duration-500 ease-in-out transform 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4`}
            style={{ maxWidth: '250px' }} // Ensure enough width for sidebar content
          >
            <div className="flex justify-end p-4">
              <button onClick={closeNav} className="text-white text-3xl">&times;</button>
            </div>
            {/* Sidebar content */}
            <div className="flex flex-col space-y-4 p-4">
              <NavLink to="/UserRegister" className="text-white text-xl" onClick={handleLinkClick}>User Register  </NavLink>
              <NavLink to="/Permission" className="text-white text-xl" onClick={handleLinkClick}>Permission </NavLink>
              <NavLink to="/LeaveForm" className="text-white text-xl" onClick={handleLinkClick}>LeaveForm</NavLink>
              <NavLink to="/Dashboard" className="text-white text-xl" onClick={handleLinkClick}>Dashboard</NavLink>
              <NavLink to="/LeaveStatus" className="text-white text-xl" onClick={handleLinkClick}>LeaveStatus</NavLink>
              <NavLink to="/PermissionStatus" className="text-white text-xl" onClick={handleLinkClick}>PermissionStatus</NavLink>
              <NavLink to="/admincalender" className="text-white text-xl" onClick={handleLinkClick}>Calendar</NavLink>
              <NavLink to="/LeaveAssign" className="text-white text-xl" onClick={handleLinkClick}>LeaveAssign</NavLink>
              <NavLink to="/holidays" className="text-white text-xl" onClick={handleLinkClick}>Holidays List</NavLink>
              <NavLink to="/LeaveReports" className="text-white text-xl" onClick={handleLinkClick}>LeaveReports</NavLink>
              <NavLink to="/Attendance" className="text-white text-xl" onClick={handleLinkClick}>Attendance</NavLink>

              <button onClick={handleLogout} className="text-white text-xl mt-4">Logout</button>
            </div>
          </div>
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
          {/* Menu Button */}
          <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776; Menu</span>

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
