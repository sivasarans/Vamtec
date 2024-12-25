import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaveRequests } from '../../redux/leavestatus'; // Import the action
import { fetchPermissions } from '../../redux/permissionsSlice'; // Import the fetch permissions action

// Custom Day Component
function CustomDay(props) {
  const { leaveDays = [], permissionDays = [], day, outsideCurrentMonth, ...other } = props;

  // Find leave and permission status for the current day
  const leaveStatus = leaveDays.find((leave) =>
    dayjs(leave.date).isSame(day, 'day')
  );
  
  const permissionStatus = permissionDays.find((permission) =>
    dayjs(permission.date).isSame(day, 'day')
  );

  // Tooltip message for the leave or permission status
  const tooltipMessage = leaveStatus?.status || permissionStatus?.status || '';

  // Define background styles based on leave or permission status
  const getBackgroundStyle = (status, isPermission) => {
    if (isPermission) {
      // Permission statuses (unique colors)
      if (status === 'Approved') return { backgroundColor: '#d0f5d0', color: '#2e7d32' }; // Light green
      if (status === 'Rejected') return { backgroundColor: '#f8d7da', color: '#d32f2f' }; // Light red
      if (status === 'Pending') return { backgroundColor: '#fff3cd', color: '#856404' }; // Light yellow
    }
    // Leave statuses (different colors)
    if (status === 'Approved') return { backgroundColor: '#d0f5d0', color: '#2e7d32' }; // Light green
    if (status === 'Rejected') return { backgroundColor: '#f8d7da', color: '#d32f2f' }; // Light red
    if (status === 'Pending') return { backgroundColor: '#fff3cd', color: '#856404' }; // Light yellow
    return {};
  };

  // Create a permission status symbol
  const permissionStatusSymbol = permissionStatus?.status === 'Approved' ? 'P' : 
                                  permissionStatus?.status === 'Rejected' ? 'P' : 
                                  permissionStatus?.status === 'Pending' ? 'P' : null;

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
              ...getBackgroundStyle(leaveStatus?.status || permissionStatus?.status, !!permissionStatus), // Apply background color
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}
          />
          {/* Display Permission Status Symbol */}
          {permissionStatusSymbol && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '4px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: getBackgroundStyle(permissionStatus?.status, true).color, // Matches permission text color
              }}
            >
              {permissionStatusSymbol}
            </span>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default function EmployeeLeaveCalendar() {
  const dispatch = useDispatch();
  const { leavestatusData, loading, userData } = useSelector((state) => state.leavestatus); // Fetching from Redux state
  const { permissionRequests } = useSelector((state) => state.permissions); // Fetching permission data

  const { user_id, name } = userData || {}; // Extract user details from userData

  // Fetch leave and permission data when the component mounts
  useEffect(() => {
    if (user_id) {
      dispatch(fetchLeaveRequests()); // Dispatch action to fetch leave requests
      dispatch(fetchPermissions()); // Dispatch action to fetch permission data
    }
  }, [dispatch, user_id]);

  // Filter and format leave and permission data based on the logged-in user
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

  const permissionData = permissionRequests
    .filter((permission) => permission.user_id === user_id)
    .map((permission) => ({
      date: dayjs(permission.date),
      status: permission.status, // Use the actual status from permission request
    }));

  return (
    <>
      <div>
        {/* {userData ? (
          <div className="text-sm text-gray-700 mb-4">
            <p className="inline-block bg-green-100 px-2 py-1 m-2 rounded-md mb-5">
              Leave and Permission Status for: "{name}"
            </p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )} */}

{/* Color Description Section */}
<div className="mb-4">
        <p className="text-sm text-gray-600">Color Legend:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-200 mr-2"></div>
            <span>Approved</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-200 mr-2"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-200 mr-2"></div>
            <span>Rejected</span>
          </div>
          <div className="flex items-center">
          <span className="text-green-900 mr-2 font-bold">P</span>
          <span>Permission</span>
          </div>
        </div>
      </div>

      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          loading={loading}
          views={['year', 'month', 'day']}
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: {
              leaveDays: leaveData,
              permissionDays: permissionData, // Pass permission data to the calendar
            },
          }}
          sx={{
            width: '100%',
            margin: '0 auto', // Center the calendar horizontally
            borderRadius: '25px', // Optional rounded corners
            padding: '16px', // Optional padding inside the calendar
            maxWidth: '500px', // Limits the calendar's width on larger screens
            bgcolor: 'rgb(233, 231, 255)',
            color: 'rgb(66, 23, 115)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Enhanced shadow effect
          }}
        />
      </LocalizationProvider>
    </>
  );
}
