import React, { useState, useEffect } from 'react';

function LeaveAssignmentForm() {
  const [leaveData, setLeaveData] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [userRole, setUserRole] = useState('Admin'); // Default role is Admin

  // Initialize the leave data in localStorage if it doesn't exist
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('leaveData'));
    if (!storedData) {
      const initialData = [
        {
          user_id: 1,
          name: 'Alice (Admin)',
          EL: 15.0,
          SL: 8.0,
          CL: 6.0,
          CO: 3.0,
          SO: 2.0,
          SML: 3.0,
          ML: 0.0,
          CW: 0.0,
          OOD: 1.0,
          HL: 2.0,
          COL: 1.0,
          WFH: 5.0,
          WO: 4.0,
          MP: 0.0,
          A: 0.0,
        },
        {
          user_id: 2,
          name: 'Bob (Manager)',
          EL: 12.0,
          SL: 5.0,
          CL: 4.0,
          CO: 2.0,
          SO: 1.0,
          SML: 1.0,
          ML: 0.0,
          CW: 0.0,
          OOD: 0.5,
          HL: 1.0,
          COL: 0.5,
          WFH: 3.0,
          WO: 4.0,
          MP: 0.0,
          A: 0.0,
        },
        {
          user_id: 3,
          name: 'Charlie (HR Manager)',
          EL: 10.0,
          SL: 6.0,
          CL: 7.0,
          CO: 2.0,
          SO: 0.0,
          SML: 0.0,
          ML: 0.0,
          CW: 1.0,
          OOD: 0.0,
          HL: 2.0,
          COL: 0.0,
          WFH: 2.0,
          WO: 4.0,
          MP: 0.0,
          A: 0.0,
        },
        {
          user_id: 4,
          name: 'Diana (Employee)',
          EL: 8.0,
          SL: 4.0,
          CL: 3.0,
          CO: 1.0,
          SO: 1.0,
          SML: 0.0,
          ML: 0.0,
          CW: 0.0,
          OOD: 0.5,
          HL: 1.0,
          COL: 0.0,
          WFH: 3.0,
          WO: 4.0,
          MP: 0.0,
          A: 0.0,
        },
      ];

      // Save initial data to localStorage
      localStorage.setItem('leaveData', JSON.stringify(initialData));
    } else {
      setLeaveData(storedData);
      setFilteredData(storedData); // Set initial filtered data to all leave data
    }
  }, []);

  // Handle input change for editable leave data
  const handleInputChange = (e, userId, leaveType) => {
    const updatedData = leaveData.map((user) => {
      if (user.user_id === userId) {
        return {
          ...user,
          [leaveType]: parseFloat(e.target.value),
        };
      }
      return user;
    });

    setLeaveData(updatedData);
    setFilteredData(updatedData); // Keep filtered data updated
    localStorage.setItem('leaveData', JSON.stringify(updatedData));
  };

  // Search for users by ID
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchId(searchValue);
    if (searchValue === '') {
      setFilteredData(leaveData); // Reset to all data when search is empty
    } else {
      const filtered = leaveData.filter((user) =>
        user.user_id.toString().includes(searchValue)
      );
      setFilteredData(filtered);
    }
  };

  // Handle role change
  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  // Render leave data form for a single user
  const renderLeaveData = (user) => {
    return (
      <div key={user.user_id} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <h4 className="text-xl font-semibold mb-4">{user.name}</h4>
        <div className="grid grid-cols-2 gap-6">
          {Object.keys(user)
            .filter((key) => key !== 'user_id' && key !== 'name')
            .map((leaveType) => (
              <div key={leaveType} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">{leaveType}</label>
                <input
                  type="number"
                  value={user[leaveType]}
                  onChange={(e) =>
                    handleInputChange(e, user.user_id, leaveType)
                  }
                  disabled={userRole !== 'Admin'}
                  className={`${
                    userRole !== 'Admin' ? 'bg-gray-200' : 'bg-white'
                  } p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6">Leave Assignment</h3>

      {/* Role Selection Dropdown */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2">Select Role</label>
        <select
          value={userRole}
          onChange={handleRoleChange}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchId}
          onChange={handleSearch}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display Error */}
      {error && <div className="bg-red-500 text-white p-2 rounded-md mb-4">{error}</div>}
      
      {/* Render filtered leave data */}
      {filteredData.length > 0 ? (
        <div>
          {filteredData.map((user) => renderLeaveData(user))}
        </div>
      ) : (
        <p>No leave data found for this search.</p>
      )}
    </div>
  );
}

export default LeaveAssignmentForm;
