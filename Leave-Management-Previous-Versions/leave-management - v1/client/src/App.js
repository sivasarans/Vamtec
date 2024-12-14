import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/dashboard_home';
import LeaveRequestForm from './components/leave_requests';
import PermissionForm from './components/PermissionForm';
import UserRegisterForm from './components/UserRegisterForm';
import LeaveRequests from './components/leavestatus';
import PermissionRequests from './components/PermissionRequests';
import AdminCalendar from './components/AdminCalendar';
import LeaveAssignmentForm from './components/LeaveAssignmentForm';
import HolidayCalendar from './components/HolidayCalendar';
// import LeaveAssignment from './components/LeaveAssignment';
import DownloadButton from './components/reports';

function App() {  
  return (
    <div className="App">
      <Router>
        {/* Navigation Bar */}
        <div className="flex space-x-4 p-4 bg-gray-800 text-white">
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
          </NavLink>          <NavLink
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
            Calender
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
             Reports ( leave status )
          </NavLink>  
        </div>

        {/* Routes */}
        <Routes>
        <Route path="/" element={< DownloadButton/>} />

        <Route path="/reports" element={< DownloadButton/>} />
        <Route path="/holidays" element={< HolidayCalendar/>} />
        <Route path="/leaveassign" element={< LeaveAssignmentForm/>} />
        <Route path="/admin-permission" element={<PermissionRequests />} />
        <Route path="/admin-leave" element={<LeaveRequests />} />
        <Route path="/UserRegister" element={<UserRegisterForm />} />
          <Route path="/Permission" element={<PermissionForm />} />
          <Route path="/LeaveRequest" element={<LeaveRequestForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/admincalender" element={<AdminCalendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
