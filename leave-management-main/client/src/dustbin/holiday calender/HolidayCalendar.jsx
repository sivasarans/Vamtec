import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles
import axios from 'axios';

function HolidayCalendar() {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const [holidayReason, setHolidayReason] = useState(''); // Track holiday reason input
  const [userRole, setUserRole] = useState('Admin'); // Role state (Admin or Employee)
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Track the currently selected month

  // Fetch holidays from the backend
  const fetchHolidays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/holidays/holidays');
      const fetchedHolidays = response.data.map(holiday => ({
        ...holiday,
        date: new Date(holiday.upload_time), // Convert timestamp to Date object
      }));
      setHolidays(fetchedHolidays);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };
  useEffect(() => {

    fetchHolidays();
  }, []);

  // Handle role change (Admin or Employee)
  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  // Filter holidays for the currently selected month
  const currentMonthHolidays = holidays.filter(
    (holiday) => holiday.date.getMonth() === selectedMonth.getMonth() &&
      holiday.date.getFullYear() === selectedMonth.getFullYear()
  );

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(new Date(date.setHours(0, 0, 0, 0))); // Ensure time is zeroed out for accurate comparison
    const existingHoliday = holidays.find(
      (holiday) => holiday.date.toDateString() === new Date(date.setHours(0, 0, 0, 0)).toDateString()
    );
    setHolidayReason(existingHoliday ? existingHoliday.title : '');
  };

  // Handle holiday reason change
  const handleReasonChange = (e) => {
    setHolidayReason(e.target.value);
  };

  // // Add or update a holiday
  // const saveHoliday = async () => {
  //   if (selectedDate && holidayReason) {
  //     console.log('selected date: ' + selectedDate);
  //     try {
  //       const existingHoliday = holidays.find(
  //         (holiday) => holiday.date.toDateString() === selectedDate.toDateString()
  //       )
  //       } else {
  //         // Create new holiday
  //         await axios.post('http://localhost:5000/holidays/holidays', {
  //           title: holidayReason,
  //           date:selectedDate,            
  //         });
  //       }

  //       // Refresh holiday list
  //       const response = await axios.get('http://localhost:5000/holidays/holidays');
  //       const updatedHolidays = response.data.map(holiday => ({
  //         ...holiday,
  //         date: new Date(holiday.upload_time),
  //       }));
  //       setHolidays(updatedHolidays);

  //       setSelectedDate(null);
  //       setHolidayReason('');
  //     } catch (error) {
  //       console.error('Error saving holiday:', error);
  //     }
  //   } else {
  //     alert('Please select a date and provide a holiday reason.');
  //   }
  // };

  const saveHoliday = async () => {
    if (selectedDate && holidayReason) {
      try {
        await axios.post('http://localhost:5000/holidays/holidays', {
          title: holidayReason,
          date: selectedDate.toISOString(),
        });
  
        // Refresh holidays
        fetchHolidays();
      } catch (error) {
        console.error('Error adding holiday:', error);
      }
    } else {
      alert('Please select a date and provide a holiday reason.');
    }
  };
  
  // Delete a holiday
  const deleteHoliday = async () => {
    if (selectedDate) {
      try {
        const existingHoliday = holidays.find(
          (holiday) => holiday.date.toDateString() === selectedDate.toDateString()
        );
        if (existingHoliday) {
          await axios.delete(`http://localhost:5000/holidays/holidays/${existingHoliday.id}`);

          // Refresh holiday list
          const response = await axios.get('http://localhost:5000/holidays/holidays');
          const updatedHolidays = response.data.map(holiday => ({
            ...holiday,
            date: new Date(holiday.upload_time),
          }));
          setHolidays(updatedHolidays);
        }

        setSelectedDate(null);
        setHolidayReason('');
      } catch (error) {
        console.error('Error deleting holiday:', error);
      }
    }
  };

  // Check if the date is a holiday
  const isHoliday = (date) => {
    return holidays.some((holiday) => holiday.date.toDateString() === new Date(date.setHours(0, 0, 0, 0)).toDateString());
  };

  // Handle month change in the calendar
  const handleMonthChange = (date) => {
    setSelectedMonth(date); // Set selected month to the new date
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Admin/Employee Dropdown */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2">Select Role</label>
        <select
          value={userRole}
          onChange={handleRoleChange}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      {/* Calendar Component */}
      <Calendar
        onClickDay={handleDateClick}
        value={selectedMonth}
        onChange={handleMonthChange}
        tileContent={({ date, view }) => {
          if (view === 'month' && isHoliday(date)) {
            return (
              <div
                style={{
                  backgroundColor: '#d1fae5', // Custom background color
                  color: '#6b8f39', // Custom text color
                  fontWeight: 'bold', // Bold text
                }}
                className="w-full h-full"
              />
            );
          }
          return null;
        }}
      />

      {/* Display List of Holidays for Current Month */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">
          Holidays for {selectedMonth.toLocaleString('default', { month: 'long' })}
        </h3>
        <ul className="mt-2">
          {currentMonthHolidays.length === 0 ? (
            <li className="text-gray-600">No holidays set for this month.</li>
          ) : (
            currentMonthHolidays.map((holiday) => (
              <li key={holiday.id} className="text-gray-800">
                {holiday.date.toLocaleDateString()} - {holiday.title}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Holiday Input and Action Buttons */}
      {userRole === 'Admin' && selectedDate && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Holiday Reason</label>
          <input
            type="text"
            value={holidayReason}
            onChange={handleReasonChange}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter holiday reason"
          />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={saveHoliday}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              {holidays.some(
                (holiday) => holiday.date.toDateString() === selectedDate.toDateString()
              )
                ? 'Update Holiday'
                : 'Add Holiday'}
            </button>
            <button
              onClick={deleteHoliday}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete Holiday
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HolidayCalendar;
