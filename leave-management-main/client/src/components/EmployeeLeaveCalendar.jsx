import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaveRequests } from '../redux/leavestatus'; // Import the action

// Custom Day Component
function CustomDay(props) {
  const { leaveDays = [], day, outsideCurrentMonth, ...other } = props;

  // Find leave status for the current day
  const leaveStatus = leaveDays.find((leave) =>
    dayjs(leave.date).isSame(day, 'day')
  );

  // Define status and tooltip message
  const statusSymbol = leaveStatus?.status === 'Approved' ? '✔️' :
                       leaveStatus?.status === 'Rejected' ? '❌' :
                       leaveStatus?.status === 'Pending' ? '❓' :
                       null;

  const tooltipMessage = leaveStatus?.status || '';

  // Define background styles based on leave status
  const getBackgroundStyle = (status) => {
    if (status === 'Approved') return { backgroundColor: '#d0f5d0', color: '#2e7d32' }; // Light green
    if (status === 'Rejected') return { backgroundColor: '#f8d7da', color: '#d32f2f' }; // Light red
    if (status === 'Pending') return { backgroundColor: '#fff3cd', color: '#856404' }; // Light yellow
    return {};
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Tooltip for the entire date */}
      <Tooltip title={tooltipMessage} arrow>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Day Cell with Background Color */}
          <PickersDay
            {...other}
            day={day}
            outsideCurrentMonth={outsideCurrentMonth}
            style={{
              borderRadius: '50%', // Keeps day circular
              ...getBackgroundStyle(leaveStatus?.status), // Apply background color
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          />
        </div>
      </Tooltip>

      {/* Status Symbol on Top-Right */}
      {statusSymbol && (
        <span
          style={{
            position: 'absolute',
            top: '2px',
            right: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: getBackgroundStyle(leaveStatus?.status).color, // Matches text color
          }}
        >
          {statusSymbol}
        </span>
      )}
    </div>
  );
}

export default function EmployeeLeaveCalendar() {
  const dispatch = useDispatch();
  const { leavestatusData, loading } = useSelector((state) => state.leavestatus); // Using Redux state

  const [userData, setUserData] = useState(null);

  const { user_id } = userData || {}; // Extract user_id from userData

  // Fetch user data from localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('userDetails'));
      if (storedUserData) setUserData(storedUserData);
    };
    fetchUserData();
  }, []);

  // Fetch leave data from Redux store when component mounts
  useEffect(() => {
    if (user_id) {
      dispatch(fetchLeaveRequests()); // Dispatch action to fetch leave requests
    }
  }, [dispatch, user_id]);

  // Filter and format leave data based on the logged-in user
  const leaveData = leavestatusData
    .filter((leave) => leave.user_id === user_id)
    .flatMap((leave) => {
      const startDate = dayjs(leave.from_date);
      const endDate = dayjs(leave.to_date);
      const datesInRange = [];

      // Generate all dates between start and end date (inclusive)
      for (let currentDate = startDate; currentDate.isBefore(endDate, 'day') || currentDate.isSame(endDate, 'day'); currentDate = currentDate.add(1, 'day')) {
        datesInRange.push({
          date: currentDate,
          status: leave.status,
        });
      }

      return datesInRange;
    });

  return (
    <>
      <div>
        {userData ? (
          <div className="text-sm text-gray-700 mb-4">
            <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">Welcome: "{userData.name}"</p>
            <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md">User ID: {userData.user_id}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 style={{ marginBottom: '16px' }}>Leave Calendar</h1>
        <DateCalendar
          loading={loading}
          views={['year', 'month', 'day']}
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: {
              leaveDays: leaveData,
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
