import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function AdminCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allLeaves, setAllLeaves] = useState([]); // Store all leaves
  const [filteredLeaves, setFilteredLeaves] = useState([]); // Filtered leaves for the selected date
  const [userData, setUserData] = useState(null);

  // Load leave applications from backend (fetched once)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const leavesResponse = await axios.get('http://localhost:5000/leavebalance/get/leave-applications');
        setAllLeaves(leavesResponse.data); // Set all leaves in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('userDetails'));
      if (storedUserData) setUserData(storedUserData);
    };
    fetchUserData();
  }, []);

  // Filter leaves based on the selected date (between from_date and to_date)
  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format selected date to YYYY-MM-DD

    // Filter leaves for the selected date, taking into account the range
    const filteredLeaves = allLeaves.filter((leave) => {
      const fromDate = new Date(leave.from_date);
      const toDate = new Date(leave.to_date);

      // Check if the selected date falls within the range of from_date and to_date
      return selectedDate >= fromDate && selectedDate <= toDate;
    });

    setFilteredLeaves(filteredLeaves);
  }, [selectedDate, allLeaves]);

  // Define columns for the DataGrid
  const columns = [
    { field: 'user_name', headerName: 'User Name', width: 200 },
    { field: 'reason', headerName: 'Reason', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  // Define rows for the DataGrid based on filtered leaves
  // const rows = useMemo = () =>
  // filteredLeaves.map((leave, index) => ({
  //   id: leave.id, // Set a unique ID for each row
  //   user_name: leave.user_name,
  //   reason: leave.reason,
  //   status: leave.status,
  // })),
  // [filteredLeaves] // Recalculate rows only when filteredLeaves changes

  const rows = useMemo(
    () =>
      filteredLeaves.map((leave, index) => ({
        id: leave.id,
        user_name: leave.user_name,
        reason: leave.reason,
        status: leave.status,
      })),
    [filteredLeaves] // Recalculate rows only when filteredLeaves changes
  );


  return (
    <div>
      {userData ? (
        <div className="text-sm text-gray-700 mb-4">
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User: "{userData.name}"</p>
          <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User ID: {userData.user_id}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <Grid container spacing={3} p={6}>
        {/* Calendar Section */}
        <Grid item xs={12} md={4}>
          <h1 className="text-2xl font-bold mb-4">Admin Calendar</h1>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="shadow-lg border rounded-lg"
          />
        </Grid>

        {/* Leave Details Section */}
        <Grid item xs={12} md={8}>
          <h2 className="text-xl font-semibold mb-4">
            Details for {selectedDate.toDateString()}
          </h2>

          {/* DataGrid for Leaves */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5} // You can adjust the number of rows per page
              rowsPerPageOptions={[5]} // Allow only 5 rows per page
              disableSelectionOnClick // Disable row selection on click
              checkboxSelection // Optionally enable checkbox selection
              
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminCalendar;
