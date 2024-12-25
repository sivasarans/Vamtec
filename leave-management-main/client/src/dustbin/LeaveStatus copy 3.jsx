import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, IconButton, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { fetchLeaveRequests, deleteLeaveRequests , updateLeaveStatus } from "../redux/leavestatus";


function LeaveStatus() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const dispatch = useDispatch();
  const { leavestatusData} = useSelector((state) => state.leavestatus);  console.log("leavestatusData:",leavestatusData);
  const deleteLeave = (requestId) => {dispatch(deleteLeaveRequests(requestId));  };

  useEffect(() => {    dispatch(fetchLeaveRequests());   }, [dispatch]);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userDetails');
    if (storedUserData) {
      const userDetails = JSON.parse(storedUserData);
      setUserData(userDetails);
      setIsAdminMode(userDetails.role === "Admin");
    }
  }, []);

  const handleReject = (requestId) => {
    const reason = window.prompt('Enter the reason for rejecting this leave request:');
    if (reason) {
      dispatch(updateLeaveStatus({requestId, newStatus: 'Rejected',rejectReason: reason}));
    } else {
      alert('Rejection reason is required!');
    }
  };

  const filterRequests = (status) => {
    if (status === 'All') return leavestatusData;
    return leavestatusData.filter((request) => request.status === status);
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
                <IconButton
                onClick={() => dispatch(updateLeaveStatus({requestId: params.row.id, newStatus:'Approved'}))}
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
        return ( <span>{params.row?.from_date ? new Date(params.row.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' ', '-') : 'N/A'}</span>);},},
    { field: 'to_date', headerName: 'End Date', flex: 1 ,
      renderCell: (params) => {
        const date = params.row?.to_date;
        return ( <span>{params.row?.from_date ? new Date(params.row.from_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' ', '-') : 'N/A'}</span>);},},
    { field: 'status', headerName: 'Status', flex: 1 ,renderCell: (params) => {
        const statusClass =
          params.row.status === 'Pending' ? 'bg-yellow-300' : params.row.status === 'Approved' ? 'bg-green-300': params.row.status === 'Rejected' ? 'bg-red-300': 'bg-gray-200'; // Default to gray if status is unknown
          return (
          <span className={`inline-block px-2 py-0.15 rounded-md ${statusClass}`}> {params.row.status}</span>
          )},},
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
  const userRequests = userData && userData.role === "Employee" ? leavestatusData.filter(request => request.user_id === userData.user_id) : leavestatusData;

  const filteredRequests = userData?.role === 'Employee' 
  ? userRequests.filter((request) =>
      request.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : leavestatusData.filter((request) =>
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
  </div>
  {userData && userData.role === "Admin" && selectedRows.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={approveAllSelected}
          style={{ marginBottom: '20px' }}
        >
          Approve All Selected
        </Button>)}
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
      checkboxSelection
      slots={{ toolbar: GridToolbar }} // Adds the toolbar with the quick filter
            slotProps={{
              toolbar: {
                showQuickFilter: true, // Enables the search input
                quickFilterProps: { debounceMs: 500 }, // Adds a debounce for better performance
              },
            }}
      onSelectionModelChange={(newSelection) => {
        console.log("Selection model changed:", newSelection);
        handleSelectRows(newSelection);
      }}
      style={{ minWidth: 1000, }}// Sets a minimum width to allow horizontal scrolling
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          position: 'sticky',
          top: 0,
          backgroundColor: 'rgba(185, 230, 80, 1)', // Header background color
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
      }}
    />
  </div>
</div>

  );
}

export default LeaveStatus;