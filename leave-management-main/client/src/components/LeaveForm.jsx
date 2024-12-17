import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import { useNavigate } from 'react-router-dom';

const LeaveForm = () => {
  const navigate = useNavigate();

  const [leaveType, setLeaveType] = useState("EL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("Enter reason");
  const [leaveDays, setLeaveDays] = useState(1);
  const [userData, setUserData] = useState(null);
  const [leaveData, setLeaveData] = useState(null);
  const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });

  useEffect(() => {
    const today = new Date();
    setFromDate(today.toISOString().split("T")[0]);
    setToDate(today.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('userDetails'));
      if (storedUserData) setUserData(storedUserData);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchLeaveData = async () => {
      if (!userData) return;
      try {
        console.log("Fetching leave data...");  // Debug line
        const response = await axios.get('http://localhost:5000/leave');
        console.log("GET Response Status:", response.status);  // Debug line
        const data = response.data;
        console.log("Leave Data:", data);  // Debug line
        const userLeaveData = data.filter(item => item.user_id === userData.user_id);
        if (userLeaveData.length) setLeaveData(userLeaveData[0]);
      } catch (error) {
        console.error("Error fetching leave data:", error);  // Debug line
      }
    };
    fetchLeaveData();
  }, [userData]);
  

  useEffect(() => {
    if (fromDate && toDate) {
      const days = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1;
      setLeaveDays(days);
    }
  }, [fromDate, toDate]);

  const handleApply = async () => {
    // Validate input fields
    if (!fromDate || !toDate || !leaveType || !reason || leaveDays <= 0) {
      setAlertMessage({ message: 'All fields are required with valid inputs!', type: 'error' });
      return;
    }
  
    // Check if the leave balance is sufficient
    if (leaveData && leaveData[leaveType.toLowerCase()] < leaveDays) {
      setAlertMessage({ message: "Insufficient leave balance", type: "error" });
      return;
    }
  
    // Prepare leave request data
    const leaveRequest = { 
      user_id: userData.user_id, 
      user_name: userData.name, 
      leave_type: leaveType, 
      from_date: fromDate, 
      to_date: toDate, 
      leave_days: leaveDays, 
      reason: reason 
    };
  console.log(leaveRequest);
    try {
      // Step 1: Apply leave request
      const response = await axios.post('http://localhost:5000/leave/apply_leave', leaveRequest);
      
      // Check if leave application was successful
      if (response.status === 200 || response.status === 201) {
        // Step 2: Reduce leave balance after successful leave application
        const reduceLeaveBalanceResponse = await axios.put('http://localhost:5000/leave/reduce_leave_balance', {
          user_id: userData.user_id,
          leave_type: leaveType.toLowerCase(),
          leave_days: leaveDays
        });
  
        // Log the response and update leave data
        console.log(reduceLeaveBalanceResponse.data);
        setLeaveData(prev => ({
          ...prev,
          [leaveType.toLowerCase()]: prev[leaveType.toLowerCase()] - leaveDays
        }));
  
        setAlertMessage({ message: 'Leave applied and balance updated successfully!', type: 'success' });
        handleReset();
      } else {
        // Error in leave application
        setAlertMessage({ message: `Error: ${response.data.error}`, type: 'error' });
      }
    } catch (error) {
      console.error("Error applying for leave:", error);
      setAlertMessage({ message: 'Server error occurred while submitting the form.', type: 'error' });
    }
  };
  
  
  useEffect(() => {
    if (alertMessage.message) {
      const timer = setTimeout(() => setAlertMessage({ message: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleReset = () => {
    setLeaveType("EL");
    setFromDate(toDate);
    setReason("Enter reason");
    setLeaveDays(1);
  };

  const sortedLeaveData = leaveData ? Object.keys(leaveData).filter(key => key !== "user_id").sort((a, b) => leaveData[b] - leaveData[a]) : [];


  const BackToStatus = () => {
    navigate('/leavestatus'); // Correctly navigate to the /leavestatus page when the button is clicked
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            
<button 
      onClick={BackToStatus} 
      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
       Back to Leave Status
      </span>
    </button>


      {alertMessage.message && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md w-80 text-center ${alertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {alertMessage.message}
        </div>
      )}
      <h2 className="text-xl font-bold text-orange-500 text-center mb-6">Apply Leave</h2>

      {userData ? (
        <div className="text-sm text-gray-700 mb-4">
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User: "{userData.name}"</p>
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User ID: {userData.user_id}</p>
        </div>
      ) : <p>Loading user data...</p>}

      <div className="flex overflow-x-auto">
        {sortedLeaveData.map((leave, index) => leave !== 'name' && leave !== 'updated_time' && (
          <div key={index} className="flex-shrink-0 w-32 p-4 border bg-gray-100 rounded-md mx-2 my-2">
            <p className="font-medium">{leave.toUpperCase()}</p>
            <p className="text-sm text-blue-500">{leaveData[leave]} Day(s) Left</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Leave Type</label>
        <select className="w-full p-2 border border-gray-300 rounded-md" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          {["EL", "SL", "CL", "CO", "SO", "SML", "ML", "CW", "OOD", "COL", "WFH", "WO", "MP"].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {leaveData && leaveData[leaveType.toLowerCase()] !== undefined && (
          <p className="text-sm text-blue-500">{`${leaveType.toUpperCase()}: ${leaveData[leaveType.toLowerCase()]} Day(s) Left`}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">From</label>
        <input type="date" className="w-full p-2 border border-gray-300 rounded-md" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">To</label>
        <input type="date" className="w-full p-2 border border-gray-300 rounded-md" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>

      <div className="mb-4">
        <p className="text-sm text-blue-500">{`Applying for ${leaveDays} Day(s) Leave`}</p>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Reason</label>
        <textarea className="w-full p-2 border border-gray-300 rounded-md" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter your reason" />
      </div>

      <div className="flex space-x-4">
        <button onClick={handleApply} className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Apply</button>
        <button onClick={handleReset} className="w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">Reset</button>
      </div>
    </div>
  );
};

export default LeaveForm;
