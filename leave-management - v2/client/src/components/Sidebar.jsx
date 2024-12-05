// src/components/Sidebar.js
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, closeNav, openNav, handleLinkClick }) => {
  const sidenavRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
      closeNav();
    }
  };

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
    <div
      ref={sidenavRef}
      id="mySidenav"
      className={`fixed inset-0 bg-gray-800 bg-opacity-90 transition-all duration-500 ease-in-out transform 
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4`}
      style={{ maxWidth: '250px' }}
    >
      <div className="flex justify-end p-4">
        <button onClick={closeNav} className="text-white text-3xl">&times;</button>
      </div>
      <div className="flex flex-col space-y-4 p-4">
        <NavLink to="/UserRegister" className="text-white text-xl" onClick={handleLinkClick}>User Register</NavLink>
        <NavLink to="/Permission" className="text-white text-xl" onClick={handleLinkClick}>Permission</NavLink>
        <NavLink to="/LeaveForm" className="text-white text-xl" onClick={handleLinkClick}>LeaveForm</NavLink>
        <NavLink to="/Dashboard" className="text-white text-xl" onClick={handleLinkClick}>Dashboard</NavLink>
        <NavLink to="/LeaveStatus" className="text-white text-xl" onClick={handleLinkClick}>LeaveStatus</NavLink>
        <NavLink to="/PermissionStatus" className="text-white text-xl" onClick={handleLinkClick}>PermissionStatus</NavLink>
        <NavLink to="/admincalender" className="text-white text-xl" onClick={handleLinkClick}>Calendar</NavLink>
        <NavLink to="/LeaveAssign" className="text-white text-xl" onClick={handleLinkClick}>LeaveAssign</NavLink>
        <NavLink to="/holidays" className="text-white text-xl" onClick={handleLinkClick}>Holidays List</NavLink>
        <NavLink to="/LeaveReports" className="text-white text-xl" onClick={handleLinkClick}>LeaveReports</NavLink>
        <NavLink to="/Attendance" className="text-white text-xl" onClick={handleLinkClick}>Attendance</NavLink>

        {/* <button onClick={handleLogout} className="text-white text-xl mt-4">Logout</button> */}
      </div>
    </div>
  );
};

export default Sidebar;
