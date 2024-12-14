import React, { useState } from 'react';

function PermissionStatus() {
  // Sample permission request data (you can fetch this data from the backend)
  const permissionRequests = [
    { id: 1, user_name: 'TVK', date: '2024-12-01', duration: 1.0, status: 'Approved', reason: 'System maintenance' },
    { id: 2, user_name: 'John Doe', date: '2024-12-02', duration: 0.5, status: 'Pending', reason: 'Team meeting preparation' },
    { id: 3, user_name: 'Jane Smith', date: '2024-12-03', duration: 1.0, status: 'Rejected', reason: 'Personal work' },
    { id: 4, user_name: 'Mark Lee', date: '2024-12-05', duration: 0.5, status: 'Pending', reason: 'Urgent client call' },
  ];

  // Sample user role (you can fetch this from the backend or context)
  const userRole = 'Admin'; // This can be 'Admin', 'Manager', 'HR Manager', 'Employee', etc.

  // State to store the active tab
  const [activeTab, setActiveTab] = useState('All');

  // Function to handle approval
  const approvePermission = (permissionId) => {
    // Logic to approve the permission (e.g., update status in the backend)
    console.log(`Permission request ${permissionId} approved!`);
  };

  // Function to handle rejection
  const rejectPermission = (permissionId) => {
    // Logic to reject the permission (e.g., update status in the backend)
    console.log(`Permission request ${permissionId} rejected!`);
  };

  // Filter permission requests based on status
  const filterRequests = (status) => {
    if (status === 'All') return permissionRequests;
    return permissionRequests.filter(request => request.status === status);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
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

      {/* Permission Requests Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total Hours</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Reason</th>
              {userRole === 'Admin' && <th className="px-4 py-2">Actions</th>} {/* Show Actions column for Admin */}
            </tr>
          </thead>
          <tbody>
            {filterRequests(activeTab).map(request => (
              <tr key={request.id}>
                <td className="px-4 py-2">{request.user_name}</td>
                <td className="px-4 py-2">{request.date}</td>
                <td className="px-4 py-2">{request.duration * 8}</td> {/* Total Hours = Duration * 8 */}
                <td className={`px-4 py-2 ${request.status === 'Approved' ? 'bg-green-100' : request.status === 'Pending' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                  {request.status}
                </td>
                <td className="px-4 py-2">{request.reason}</td>
                {userRole === 'Admin' && (
                  <td className="px-4 py-2">
                    {request.status === 'Pending' && (
                      <>
                        <button 
                          onClick={() => approvePermission(request.id)} 
                          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => rejectPermission(request.id)} 
                          className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PermissionStatus;
