import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import EmployeeLeaveCalendar from './EmployeeLeaveCalendar';
import LeaveBalanceCount from '../LeaveBalanceCount';
import LeaveCountGraphsCharts from './LeaveCountGraphsCharts';
import Dashborad_main_section_links from './Dashborad_main_section_links';
import PermissionsChart from './PermissionGraph';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const userData = useSelector((state) => state.leavestatus.userData);

  useEffect(() => {
    setUser(userData); // Set user details if available
  }, [userData]);

  if (!user) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        Please log in to view the dashboard.
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'auto',
        gap: 2,
        gridTemplateAreas: `
          "header header header header"
          "main main sidebar sidebar"
          "leaveChart permissionChart permissionChart permissionChart"
          "footer footer footer footer"
        `,
        width: '100%',
        minHeight: '100vh',
        p: 3,
        bgcolor: 'background.default',
      }}
    >
      {/* Header Section */}
      <Box sx={{ gridArea: 'header', bgcolor: 'primary.main', p: 2, textAlign: 'center', color: 'white', borderRadius: 2 }}>
        <h1>Welcome, {user.name}!</h1>
        <p>User ID: {user.user_id}</p>
        <p>Role: {user.role}</p>
      </Box>

      {/* Main Section */}
      <Box
        sx={{
          gridArea: 'main',
          bgcolor: 'rgb(245, 245, 245)', // Light gray background
          p: 2,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <h2>Main Section</h2>
        <Dashborad_main_section_links role={user.role} />
      </Box>

      {/* Sidebar Section */}
      <Box
        sx={{
          gridArea: 'sidebar',
          bgcolor: 'rgb(192, 186, 247)',
          p: 2,
          borderRadius: 2,
          color: 'rgb(27, 14, 167)',
        }}
      >
        <h2>Quick Access</h2>
        <div className="mt-8">
          <EmployeeLeaveCalendar />
        </div>
      </Box>

      {/* Leave Count Chart Section */}
      <Box
        sx={{
          gridArea: 'leaveChart',
          bgcolor: 'rgb(250, 250, 250)', // Light background for better contrast
          p: 2,
          borderRadius: 2,
          boxShadow: 1, // Add a subtle shadow for emphasis
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Leave Count Chart</h2>
        <LeaveCountGraphsCharts />
      </Box>

      {/* Permission Count Chart Section */}
      <Box
        sx={{
          gridArea: 'permissionChart',
          bgcolor: 'rgb(250, 250, 250)', // Light background for better contrast
          p: 2,
          borderRadius: 2,
          boxShadow: 1, // Add a subtle shadow for emphasis
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Permission Count Chart</h2>
        <PermissionsChart />
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          gridArea: 'footer',
          bgcolor: 'warning.main',
          p: 2,
          borderRadius: 2,
          textAlign: 'center',
          color: 'rgb(232, 131, 35)',
        }}
      >
        <h2>Footer Section</h2>
        <LeaveBalanceCount />
      </Box>
    </Box>
  );
};

export default Dashboard;
