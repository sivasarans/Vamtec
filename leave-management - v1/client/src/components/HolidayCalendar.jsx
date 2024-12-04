import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default calendar styles

function HolidayCalendar() {
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const [holidayReason, setHolidayReason] = useState(''); // Track holiday reason input
  const [userRole, setUserRole] = useState('Admin'); // Role state (Admin or Employee)
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // Track the currently selected month

  // Load holidays from localStorage on component mount
  useEffect(() => {
    const savedHolidays = JSON.parse(localStorage.getItem('holidays')) || [];
    const parsedHolidays = savedHolidays.map(holiday => ({
      ...holiday,
      date: new Date(holiday.date), // Convert stored date string back to Date object
    }));
    setHolidays(parsedHolidays);
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
    setSelectedDate(date);
    const existingHoliday = holidays.find(
      (holiday) => holiday.date.toDateString() === date.toDateString()
    );
    if (existingHoliday) {
      setHolidayReason(existingHoliday.reason);
    } else {
      setHolidayReason('');
    }
  };

  // Handle holiday reason change
  const handleReasonChange = (e) => {
    setHolidayReason(e.target.value);
  };

  // Save or update holiday
  const saveHoliday = () => {
    if (selectedDate && holidayReason) {
      const updatedHolidays = [...holidays];
      const holidayIndex = updatedHolidays.findIndex(
        (holiday) => holiday.date.toDateString() === selectedDate.toDateString()
      );
      if (holidayIndex > -1) {
        updatedHolidays[holidayIndex].reason = holidayReason;
      } else {
        updatedHolidays.push({ date: selectedDate, reason: holidayReason });
      }
      setHolidays(updatedHolidays);
      localStorage.setItem('holidays', JSON.stringify(updatedHolidays.map(holiday => ({
        ...holiday,
        date: holiday.date.toISOString(),
      }))));

      setSelectedDate(null);
      setHolidayReason('');
    } else {
      alert('Please select a date and provide a holiday reason.');
    }
  };

  // Handle holiday deletion
  const deleteHoliday = () => {
    if (selectedDate) {
      const updatedHolidays = holidays.filter(
        (holiday) => holiday.date.toDateString() !== selectedDate.toDateString()
      );
      setHolidays(updatedHolidays);
      localStorage.setItem('holidays', JSON.stringify(updatedHolidays.map(holiday => ({
        ...holiday,
        date: holiday.date.toISOString(),
      }))));

      setSelectedDate(null);
      setHolidayReason('');
    }
  };

  // Check if the date is a holiday
  const isHoliday = (date) => {
    return holidays.some((holiday) => holiday.date.toDateString() === date.toDateString());
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
        value={selectedMonth} // Make sure the calendar uses the selected month state
        onChange={handleMonthChange} // Update selected month when the month changes
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
            currentMonthHolidays.map((holiday, index) => (
              <li key={index} className="text-gray-800">
                {holiday.date.toLocaleDateString()} - {holiday.reason}
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
