import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Fetch user details from localStorage when the component mounts
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUser(storedUserDetails); // Set user details if available
    }
  }, []);

  if (!user) {
    return <div>Please log in to view the dashboard.</div>; // Show this message if no user is logged in
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl mb-4">Welcome, {user.name}!</h1>
      <p className="text-lg">User ID: {user.user_id}</p>
      <p className="text-lg">Role: {user.role}</p>
    </div>
  );
};

export default Dashboard;
