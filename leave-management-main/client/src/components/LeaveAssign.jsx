import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, IconButton, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

function LeaveAssign() {
  const [leaveData, setLeaveData] = useState([]);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null); // State to hold user data
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch user details and set role from localStorage
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails && storedUserDetails.role) {
      setUserRole(storedUserDetails.role);
      setUserData(storedUserDetails); // Set user data from localStorage
    }
  }, []);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch('http://localhost:5000/leave');
        const data = await response.json();
        setLeaveData(data);
      } catch (err) {
        setError('Failed to load leave data.');
      }
    };
    fetchLeaveData();
  }, []);

  const handleSendToBackend = async (row) => {
    const payload = {
      EL: parseFloat(row.el) || 0,
      SL: parseFloat(row.sl) || 0,
      CL: parseFloat(row.cl) || 0,
      CO: parseFloat(row.co) || 0,
      SO: parseFloat(row.so) || 0,
      SML: parseFloat(row.sml) || 0,
      ML: parseFloat(row.ml) || 0,
      CW: parseFloat(row.cw) || 0,
      OOD: parseFloat(row.ood) || 0,
      HL: parseFloat(row.hl) || 0,
      COL: parseFloat(row.col) || 0,
      WFH: parseFloat(row.wfh) || 0,
      WO: parseFloat(row.wo) || 0,
      MP: parseFloat(row.mp) || 0,
      A: parseFloat(row.a) || 0,
    };

    try {
      const response = await fetch(`http://localhost:5000/leave/admin/${row.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Error updating leave data');
      setSuccessMessage('Leave data updated successfully!');

      // Clear success message after 2 seconds
      setTimeout(() => setSuccessMessage(null), 2000);

    } catch (err) {
      setError('Failed to update leave data.');
    }
  };

  const handleSearch = (e) => setSearchId(e.target.value);

  const columns = [
    {
      field: 'actions',
      headerName: 'Update',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleSendToBackend(params.row)}>
          <CheckIcon />
        </IconButton>
      ),
    },
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    ...Object.keys(leaveData[0] || {})
      .filter((key) => key !== 'user_id' && key !== 'name' && key !== 'updated_time') // Exclude updated_time from dynamic fields
      .map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 120,
        editable: userRole === 'Admin',
      })),
    {
      field: 'updated_time',
      headerName: 'Updated Time',
      width: 180,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedTime = `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-GB', { month: 'short' })}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}${date.getHours() >= 12 ? 'pm' : 'am'}`;
        return formattedTime;
      },
    },
  ];

  const filteredRows = leaveData.filter((row) => row.user_id?.toString().includes(searchId));

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      <h3 className="text-2xl font-bold mb-6">Leave Assignment</h3>

      {userData ? (
        <div className="text-sm text-gray-700 mb-4">
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User: {userData.name}</p>
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User ID: {userData.user_id}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {successMessage && (
        <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by User ID"
          variant="outlined"
          fullWidth
          value={searchId}
          onChange={handleSearch}
        />
      </Box>

      {error && <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>}

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.user_id}
          onCellEditCommit={(params) => {
            const updatedData = leaveData.map((row) =>
              row.user_id === params.id
                ? { ...row, [params.field]: parseFloat(params.value) || row[params.field] }
                : row
            );
            setLeaveData(updatedData);
          }}
        />
      </Box>
    </Box>
  );
}

export default LeaveAssign;
