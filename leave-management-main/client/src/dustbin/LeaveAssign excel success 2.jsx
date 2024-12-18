import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TextField, Box, IconButton, Alert, Menu, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import * as XLSX from 'xlsx';

function LeaveAssign() {
  const [leaveData, setLeaveData] = useState([]);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Fetch user details
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails?.role) {
      setUserRole(storedUserDetails.role);
      setUserData(storedUserDetails);
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

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(leaveData); // Convert data to sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'LeaveData'); // Append the sheet
    XLSX.writeFile(wb, 'leave_data.xlsx'); // Download Excel file
  };

  const handleSendToBackend = async (row) => {
    const payload = { EL: parseFloat(row.el) || 0, CL: parseFloat(row.cl) || 0 };
    try {
      const response = await fetch(`http://localhost:5000/leave/admin/${row.user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Error updating leave data');
      setSuccessMessage('Leave data updated successfully!');
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      setError('Failed to update leave data.');
    }
  };

  const columns = [
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'actions',
      headerName: 'Update',
      width: 80,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleSendToBackend(params.row)}>
          <CheckIcon />
        </IconButton>
      ),
    },
    ...Object.keys(leaveData[0] || {}).map((key) => ({
      field: key,
      headerName: key.toUpperCase(),
      width: 120,
      editable: userRole === 'Admin',
    })),
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      <h3 className="text-2xl font-bold mb-6">Leave Assignment</h3>

      {successMessage && (
        <Alert variant="filled" severity="success" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          style={{ marginRight: '10px', padding: '6px 12px', cursor: 'pointer' }}
        >
          Export
        </button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => handleExportExcel()}>Export as Excel</MenuItem>
          <MenuItem onClick={() => alert('Feature: Export as CSV')}>Export as CSV</MenuItem>
          <MenuItem onClick={() => window.print()}>Print</MenuItem>
        </Menu>
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={leaveData}
          columns={columns}
          pageSize={10}
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row.user_id}
        />
      </Box>
    </Box>
  );
}

export default LeaveAssign;
