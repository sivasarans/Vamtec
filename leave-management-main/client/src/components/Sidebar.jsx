import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, closeNav, openNav, handleLinkClick }) => {
  const [user, setUser] = useState(null);
  const sidenavRef = useRef(null);

  // Fetch user details from localStorage
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUser(storedUserDetails); // Set user details if available
    }
  }, []);

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

  if (!user) {
    return null; // If no user is found, return null (you can handle this in other ways if needed)
  }

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
        {/* &times or close */}
      </div>
      <div className="flex flex-col space-y-4 p-4">
        {/* Common links */}
        <NavLink to="/Dashboard" className="text-white text-xl" onClick={handleLinkClick}>Dashboard</NavLink>
        <NavLink to="/LeaveStatus" className="text-white text-xl" onClick={handleLinkClick}>Leave Status</NavLink>
        <NavLink to="/PermissionStatus" className="text-white text-xl" onClick={handleLinkClick}>Permission Status</NavLink>
        <NavLink to="/admincalender" className="text-white text-xl" onClick={handleLinkClick}>Calendar</NavLink>

        {/* Admin role specific links */}
        {user.role === 'Admin' && (
          <>
            <NavLink to="/UserRegister" className="text-white text-xl" onClick={handleLinkClick}>User Register</NavLink>
            <NavLink to="/LeaveAssign" className="text-white text-xl" onClick={handleLinkClick}>Leave Assign</NavLink>
            <NavLink to="/LeaveReports" className="text-white text-xl" onClick={handleLinkClick}>Leave Reports</NavLink>
            <NavLink to="/Attendance" className="text-white text-xl" onClick={handleLinkClick}>Attendance</NavLink>
          </>
        )}

        {/* Links for all users */}
        {user.role !== 'Admin' && (
          <>
            <NavLink to="/LeaveForm" className="text-white text-xl" onClick={handleLinkClick}>Leave Form</NavLink>
            <NavLink to="/Permission" className="text-white text-xl" onClick={handleLinkClick}>Permission Form</NavLink>

            {/* <NavLink to="/Holidays" className="text-white text-xl" onClick={handleLinkClick}>Holidays List</NavLink> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
