{/* <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 2, // Space between buttons
      width: '100%',
    }}
  >
    {user.role === "Admin" ? (
      <>
        <NavLink
          to="/UserRegister"
          style={{
            textDecoration: 'none',
          }}
        >
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(106, 90, 205)', // Custom gradient as fallback
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            User Register
          </Box>
        </NavLink>
        <NavLink to="/LeaveStatus" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(65, 105, 225)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Leave
          </Box>
        </NavLink>
        <NavLink to="/PermissionStatus" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(28, 186, 91)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Permission
          </Box>
        </NavLink>
        <NavLink to="/admincalender" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(59, 197, 239)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Calendar
          </Box>
        </NavLink>
        <NavLink to="/LeaveAssign" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(223, 112, 199)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            LeaveAssign
          </Box>
        </NavLink>
        <NavLink to="/LeaveReports" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(218, 227, 36)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            LeaveReports
          </Box>
        </NavLink>
        <NavLink to="/Attendance" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(74, 126, 69)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Attendance
          </Box>
        </NavLink>
        <NavLink to="/LeaveBalanceCount" style={{ textDecoration: 'none' }}
        >
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(242, 206, 88)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            LeaveBalanceCount
          </Box>
        </NavLink>

      </>
    ) : (
      <>
      <NavLink to="/LeaveStatus" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(65, 105, 225)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Leave
          </Box>
        </NavLink>
        <NavLink to="/PermissionStatus" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(40, 203, 78)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Permission
          </Box>
        </NavLink>
        <NavLink to="/admincalender" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(46, 150, 198)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Calendar
          </Box>
        </NavLink>
        <NavLink to="/LeaveBalanceCount" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(255, 140, 0)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Leave Balance Count
          </Box>
        </NavLink>
        <NavLink to="/leaveform" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              p: 2,
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: 'medium',
              color: '#fff',
              bgcolor: 'rgb(30, 144, 255)',
              borderRadius: 2,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Apply Leave
          </Box>
        </NavLink>

      </>
    )}
  </Box> */}