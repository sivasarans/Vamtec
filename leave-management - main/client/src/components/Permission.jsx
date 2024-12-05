import React, { useState, useEffect } from 'react';

function Permission() {
  // State to track form values
  const [formData, setFormData] = useState({
    date: '',
    startTime: '15:00', // 3:00 PM
    endTime: '16:30',   // 4:30 PM
    reason: '',
  });
  const [alertMessage, setAlertMessage] = useState('');

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert start and end times to minutes to calculate duration
    const start = formData.startTime.split(':').map((val) => parseInt(val));
    const end = formData.endTime.split(':').map((val) => parseInt(val));

    const startMinutes = start[0] * 60 + start[1];
    const endMinutes = end[0] * 60 + end[1];
    const duration = (endMinutes - startMinutes) / 60;

    if (duration < 0.5 || duration > 2) {
      setAlertMessage('Please select a duration between 30 minutes and 2 hours.');
      return;
    }

    // If duration is valid, show an alert with the form data
    setAlertMessage(`Form Submitted!\nDate: ${formData.date}\nStart Time: ${formData.startTime}\nEnd Time: ${formData.endTime}\nReason: ${formData.reason}`);
  };

  // Set the default date to the current date
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setFormData((prevData) => ({
      ...prevData,
      date: currentDate,
    }));
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Permission Request Form</h2>

      {/* Date Input */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Start Time Input */}
      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* End Time Input */}
      <div className="mb-4">
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Reason Input */}
      <div className="mb-4">
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="mb-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      {/* Alert Message */}
      {alertMessage && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 border border-yellow-400 rounded-md">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default Permission;
