import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Cancel } from '@mui/icons-material';
import AddTaskSharpIcon from '@mui/icons-material/AddTaskSharp';
import Permission from './Permission';

function PermissionStatus() {
  const [permissionRequests, setPermissionRequests] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showPermissionForm, setShowPermissionForm] = useState(false);

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userDetails');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserData(userData);
    }
  }, []);

  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/permission');
        let data = response.data.result;

        // Filter rows based on role
        if (userData?.role !== 'Admin') {
          data = data.filter(row => row.user_id === userData?.user_id);
        }
        
        setPermissionRequests(data);
      } catch (error) {
        console.error('Error fetching permission data', error);
      }
    };

    if (userData) {
      fetchPermissionData();
    }
  }, [userData]);

  const updatePermissionStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/permission/update/${id}`, { status });
      setPermissionRequests(prev => 
        prev.map(req => (req.id === id ? { ...req, status } : req))
      );
    } catch (error) {
      console.error(`Error updating status to ${status}`, error);
    }
  };

  const columns = [
    { field: 'user_id', headerName: 'User ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    {
      field: 'date',
      headerName: 'Date',
      width: 250,
      renderCell: (params) => {
        const { date, in_time, out_time } = params.row || {};
        const formatTime12Hr = (time) => {
          const [hours, minutes] = time.split(':');
          const hour = (hours % 12) || 12;  // Converts 24hr to 12hr format
          return `${hour}:${minutes}`;
        };
        const formatOutTime = (time) => {
          const formattedTime = new Date(`1970-01-01T${time}`);
          return formattedTime.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
        };
        return (
          <span className="px-4 py-2">
            {date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
            {in_time && out_time ? ` (${formatTime12Hr(in_time)} - ${formatOutTime(out_time)})` : ''}
          </span>
        );
      },
    },
    { field: 'total_hours', headerName: 'Total Hours', width: 150 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150, 
      cellClassName: (params) => {
        switch (params.value) {
          case 'Approved': return 'bg-green-200';
          case 'Rejected': return 'bg-red-200';
          case 'Pending': return 'bg-yellow-200';
          default: return '';
        }
      }
    },
    { field: 'reason', headerName: 'Reason', width: 250 },
    userData?.role === 'Admin' && {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        params.row.status === 'Pending' && (
          <>
            <AddTaskSharpIcon
              onClick={() => updatePermissionStatus(params.row.id, 'Approved')} 
              style={{ color: 'green', cursor: 'pointer', marginRight: '16px' }} 
            />
            <Cancel 
              onClick={() => updatePermissionStatus(params.row.id, 'Rejected')} 
              style={{ color: 'red', cursor: 'pointer' }} 
            />
          </>
        )
      )
    }
  ].filter(Boolean);

  return (
    <div style={{ height: 600, width: '100%' }} className="max-w-4xl mx-auto p-4">
      {userData ? (
        <div className="text-sm text-gray-700 mb-4">
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User: "{userData.name}"</p>
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User ID: {userData.user_id}</p>
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">Role: {userData.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button 
        onClick={() => setShowPermissionForm(!showPermissionForm)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
        {showPermissionForm ? 'Close Permission Form' : 'Open Permission Form'}
      </button>
      {showPermissionForm && <Permission />}
      <DataGrid 
        rows={permissionRequests} 
        columns={columns} 
        pageSize={10} 
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: 'rgba(208, 220, 223, 0.37)', // Light grey for even rows
          },
        }}
      />
    </div>
  );
}

export default PermissionStatus;
