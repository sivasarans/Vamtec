import React, { useState } from 'react';

function LeaveRequests() {
  const leaveRequests = [
    { id: 1, user_name: 'TVK', user_id: 1, type: 'Sick Leave', start_date: '2024-12-01', end_date: '2024-12-01', status: 'Pending', reason: 'Fever and cold', reject_reason: '' },
    { id: 2, user_name: 'John Doe', user_id: 2, type: 'Casual Leave', start_date: '2024-12-02', end_date: '2024-12-02', status: 'Pending', reason: 'Family errand', reject_reason: '' },
    { id: 3, user_name: 'Jane Smith', user_id: 3, type: 'Annual Leave', start_date: '2024-12-03', end_date: '2024-12-04', status: 'Approved', reason: 'Vacation with family', reject_reason: '' },
    { id: 4, user_name: 'Mark Lee', user_id: 4, type: 'Sick Leave', start_date: '2024-12-05', end_date: '2024-12-05', status: 'Rejected', reason: 'No medical certificate', reject_reason: 'No proper documents' },
  ];

  const [activeTab, setActiveTab] = useState('All');
  const [isAdminMode, setIsAdminMode] = useState(false); // Default to Employee Mode
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectReason, setRejectReason] = useState(''); // Reason for rejection
  const [currentRequestId, setCurrentRequestId] = useState(null); // ID of the request being rejected

  const deleteLeave = (requestId) => {
    console.log(`Leave request ${requestId} deleted!`);
  };

  const updateLeaveStatus = (requestId, newStatus, reason = '') => {
    console.log(`Leave request ${requestId} status updated to ${newStatus} with reason: ${reason}`);
    setRejectReason('');
    setCurrentRequestId(null);
  };

  const handleReject = (requestId) => {
    const reason = window.prompt('Enter the reason for rejecting this leave request:');
    if (reason) {
      updateLeaveStatus(requestId, 'Rejected', reason);
    } else {
      alert('Rejection reason is required!');
    }
  };

  const filterRequests = (status) => {
    if (status === 'All') return leaveRequests;
    return leaveRequests.filter((request) => request.status === status);
  };

  const filteredRequests = leaveRequests.filter((request) =>
    request.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Mode Selector */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2">Select Mode</label>
        <select
          value={isAdminMode ? 'Admin' : 'Employee'}
          onChange={(e) => setIsAdminMode(e.target.value === 'Admin')}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin Mode</option>
          <option value="Employee">Employee Mode</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2">Search Employee</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search employee by name"
        />
      </div>

      {/* Tab Buttons */}
      <div className="mb-4 flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'Approved' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Approved')}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'Rejected' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('Rejected')}
        >
          Rejected
        </button>
      </div>

      {/* Leave Requests Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Leave Type</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Reject Reason</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.filter((request) => filterRequests(activeTab).includes(request)).map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2">{request.user_name}</td>
                <td className="px-4 py-2">{request.type}</td>
                <td className="px-4 py-2">{request.start_date}</td>
                <td className="px-4 py-2">{request.end_date}</td>
                <td
                  className={`px-4 py-2 ${
                    request.status === 'Approved'
                      ? 'bg-green-100'
                      : request.status === 'Pending'
                      ? 'bg-yellow-100'
                      : 'bg-red-100'
                  }`}
                >
                  {request.status}
                </td>
                <td className="px-4 py-2">{request.reason}</td>
                <td className="px-4 py-2">{request.reject_reason}</td>
                <td className="px-4 py-2">
                  {isAdminMode && request.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => updateLeaveStatus(request.id, 'Approved')}
                        className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                      >
                        Accept
                      </button>
                      <button
                        // onClick={() => setCurrentRequestId(request.id)}
                        onClick={() => handleReject(request.id)}

                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    !isAdminMode && request.status === 'Pending' && (
                      <button
                        onClick={() => deleteLeave(request.id)}

                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Reason Input */}
      {/* {currentRequestId && (
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 mb-2">Reason for Rejection</label>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter rejection reason here..."
          ></textarea>
          <button
            onClick={() => updateLeaveStatus(currentRequestId, 'Rejected', rejectReason)}
            className="px-4 py-2 bg-red-500 text-white rounded-md mt-2"
          >
            Submit
          </button>
        </div>
      )} */}
    </div>
  );
}

export default LeaveRequests;
