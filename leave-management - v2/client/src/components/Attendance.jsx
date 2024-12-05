import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [users, setUsers] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
  const [user, setUser] = useState(null); // State to store user details

  // Initialize attendance data and fetch user details from localStorage
  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUser(storedUserDetails); // Set user details if available
    }

    const sampleData = [
      { username: "John", attendance: {} },
      { username: "Jane", attendance: {} },
      { username: "Doe", attendance: {} },
    ];

    const existingData = localStorage.getItem("attendance_demo");
    if (!existingData) {
      localStorage.setItem("attendance_demo", JSON.stringify(sampleData));
    }

    const fetchedData = JSON.parse(localStorage.getItem("attendance_demo"));
    setUsers(fetchedData);
    setAttendanceData(fetchedData);
  }, []);

  // Handle date selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle input changes for attendance
  const handleInputChange = (username, type, value) => {
    // Use the role from the user object, no need for state anymore
    if (user && user.role === "Admin") {
      const updatedData = attendanceData.map((user) => {
        if (user.username === username) {
          if (!user.attendance[selectedDate]) {
            user.attendance[selectedDate] = { in: "09:30", out: "17:00" }; // Updated default times
          }
          user.attendance[selectedDate][type] = value;
        }
        return user;
      });
      setAttendanceData(updatedData);
    }
  };

  // Update localStorage with the modified attendance data (save all values)
  const updateAttendance = () => {
    const updatedData = attendanceData.map((user) => {
      if (!user.attendance[selectedDate]) {
        // Ensure default times are added for users without attendance for the selected date
        user.attendance[selectedDate] = { in: "09:30", out: "17:00" }; // Updated default times
      }
      return user;
    });

    localStorage.setItem("attendance_demo", JSON.stringify(updatedData));
    alert("Attendance updated successfully!");
  };

  return (
    <div className="p-4">
      {/* Display user ID and role at the top of the page */}
      {user && (
        <div className="mb-4">
          <h2 className="text-xl">User ID: {user.user_id}</h2>
          <h3 className="text-lg">Role: {user.role}</h3>
        </div>
      )}

      {/* Attendance Section */}
      <div className="flex justify-between items-center mb-4">
        <div><h1>Attendance</h1><hr /></div>
        <div className="flex gap-4">
          <div>
            <label htmlFor="date" className="mr-2">Select Date:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={updateAttendance}
        >
          Update
        </button>
      </div>

      {/* Attendance Table */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">In</th>
            <th className="border border-gray-300 px-4 py-2">Out</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="time"
                  value={
                    user.attendance[selectedDate]?.in || "09:30" // Default in time
                  }
                  onChange={(e) =>
                    handleInputChange(user.username, "in", e.target.value)
                  }
                  className={`w-full ${user.role === "employee" ? "bg-gray-200" : ""}`}
                  readOnly={user.role === "employee"}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="time"
                  value={
                    user.attendance[selectedDate]?.out || "17:00" // Default out time
                  }
                  onChange={(e) =>
                    handleInputChange(user.username, "out", e.target.value)
                  }
                  className={`w-full ${user.role === "employee" ? "bg-gray-200" : ""}`}
                  readOnly={user.role === "employee"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
