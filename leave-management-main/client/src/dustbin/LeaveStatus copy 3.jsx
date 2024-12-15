import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, IconButton, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

function LeaveStatus() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);



  // Fetch user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userDetails');
    if (storedUserData) {
      const userDetails = JSON.parse(storedUserData);
      setUserData(userDetails);
      setIsAdminMode(userDetails.role === "Admin");
    }
  }, []);

  // Fetch leave requests from the database
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/leavebalance/get/leave-applications');
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };
    fetchLeaveRequests();
  }, []);

  const updateLeaveStatus = async (requestId, newStatus, rejectReason = '') => {
    try {
      await axios.put(`http://localhost:5000/leavebalance/put/leave-applications/${requestId}`, {
        status: newStatus,
        reject_reason: rejectReason,
      });
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, status: newStatus, reject_reason: rejectReason } : request
        )
      );
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };
//danger zone ( delete server )
  const deleteLeave = async (requestId) => {
    try {
      await axios.delete(`http://localhost:5000/leavebalance/delete-leaverequest/${requestId}`);
      setLeaveRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error('Error deleting leave request:', error);
    }
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


  const handleSelectRows = (selected) => {
    console.log("Selected Rows:", selected); // Debugging to check the selected rows
    setSelectedRows(selected);
  }

  const approveAllSelected = () => {
    selectedRows.forEach((id) => {
      updateLeaveStatus(id, 'Approved');
      console.log("Approved", id );
    });
  };
  // console.log("Selected Rows:", selectedRows)



  const columns = [

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      width: 150, // Increase the width

      renderCell: (params) => (

        <>
          {isAdminMode && params.row.status === 'Pending' ? (
            <>
              <button>
                <IconButton
                onClick={() => updateLeaveStatus(params.row.id, 'Approved')}
                color="primary"
                aria-label="approve"

              >
                <CheckIcon /> {/* Approval Icon */}
              </IconButton>
              <IconButton
                onClick={() => handleReject(params.row.id)}
                color="secondary"
                aria-label="reject"

              >
                <CloseIcon /> {/* Rejection Icon */}
              </IconButton>
              </button>
            </>
                
          ) : (
            !isAdminMode && params.row.status === 'Pending' && (
              <IconButton
                onClick={() => deleteLeave(params.row.id)}
                color="default"
              >
                <DeleteIcon /> {/* Delete Icon */}
              </IconButton>
            )     

          )     } 
                
        </>
      ),
    },
    { field: 'user_name', headerName: 'User Name', flex: 1 },
    { field: 'user_id', headerName: 'User ID', flex: 1 },
    { field: 'leave_type', headerName: 'Leave Type', flex: 1 },
    { field: 'from_date', headerName: 'Start Date', flex: 1 ,
      renderCell: (params) => {
        const date = params.row?.from_date;
        return (
          <span>
            {date
              ? new Date(date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }).replace(' ', '-')
              : 'N/A'}
          </span>
        );
      },
    },
    { field: 'to_date', headerName: 'End Date', flex: 1 ,
      renderCell: (params) => {
        const date = params.row?.to_date;
        return (
          <td className="px-4 py-2">
            {date 
              ? new Date(date).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'short', year: 'numeric',
                }).replace(' ', ' - ') 
              : 'N/A'}
          </td>
        );
      },
    },
    { field: 'status', headerName: 'Status', flex: 1 ,renderCell: (params) => {
      const statusClass =
        params.row.status === 'Pending'
          ? 'bg-yellow-300'
          : params.row.status === 'Approved'
          ? 'bg-green-300'
          : params.row.status === 'Rejected'
          ? 'bg-red-300'
          : 'bg-gray-200'; // Default to gray if status is unknown

      return (
<span className={`inline-block px-2 py-0.15 rounded-md ${statusClass}`}>
{params.row.status}
        </span>
      );
    },
  },
    { field: 'reason', headerName: 'Reason', flex: 1 },
    { field: 'reject_reason', headerName: 'Reject Reason', flex: 1 },
    {
      field: 'profile_picture',
      headerName: 'Profile',
      width: 100,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000${params.row.profile_picture}`}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },


  ];

  const userRequests = userData && userData.role === "Employee" ? leaveRequests.filter(request => request.user_id === userData.user_id) : leaveRequests;

  const filteredRequests = userData?.role === 'Employee' 
  ? userRequests.filter((request) =>
      request.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : leaveRequests.filter((request) =>
      request.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  
  return (
<div className="max-w-4xl mx-auto p-4">
<NavLink
  to="/leaveform"
  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
>
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Apply Leave
  </span>
</NavLink>


  {/* User Info */}
  {userData ? (
    <div className="text-sm text-gray-700 mb-4">
      <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User: "{userData.name}"</p>
      <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User ID: {userData.user_id}</p>
      <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">Role: {userData.role}</p>
    </div>
  ) : (
    <p>Loading user data...</p>
  )}

  {/* Tab Buttons and Search Box in Same Line */}
  <div className="mb-4 flex justify-between items-center space-x-4">
    <div className="flex space-x-4">
      {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
        <button
          key={status}
          className={`px-4 py-0.5 rounded-md ${activeTab === status ? `bg-${status === 'Approved' ? 'green' : status === 'Pending' ? 'yellow' : 'red'}-500 text-white` : 'bg-gray-200'}`}
          onClick={() => setActiveTab(status)}
        >
          {status}
        </button>
      ))}
    </div>

    {/* Search Box for Admin */}
    {userData && userData.role === "Admin" && (
      <Box sx={{ width: '300px' }}>
        <TextField
          label="Search by User name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
      </Box>
    )}
  </div>
  {/* Approve All Selected Button */}
  {userData && userData.role === "Admin" && selectedRows.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={approveAllSelected}
          style={{ marginBottom: '20px' }}
        >
          Approve All Selected
        </Button>)}
      

  {/* Leave Requests Table */}
  <div 
        style={{
          height: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'auto', // Enable horizontal scrolling
          overflowY: 'auto', // Allow vertical scrolling if needed
        }}
  >
    <DataGrid
      rows={filteredRequests.filter((request) => filterRequests(activeTab).includes(request))}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5, 10, 20]}
      // checkboxSelection={false}
      // disableSelectionOnClick
      autoHeight={false}
      density="compact"
      checkboxSelection
      onSelectionModelChange={(newSelection) => {
        console.log("Selection model changed:", newSelection);
        handleSelectRows(newSelection);

      }}
      // onSelectionModelChange={console.log("Selection model changed:")
      // }
      
      style={{
        minWidth: 1000, // Sets a minimum width to allow horizontal scrolling
      }}
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(185, 230, 80, 1)', // Header background color
        },
        '& .MuiDataGrid-columnHeadersInner': {
          backgroundColor: 'rgba(247, 247, 247, 1)', // Footer background color
        },
        '& .MuiDataGrid-footerContainer': {
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'rgba(122, 143, 140, 0.18)', // Footer background color
          zIndex: 2,
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
          backgroundColor: 'rgba(208, 220, 223, 0.37)', // Light grey for even rows
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: 'rgb(112, 235, 136)', // Highlight rows on hover
        },
      }}
    />
  </div>
</div>

  );
}

export default LeaveStatus;
