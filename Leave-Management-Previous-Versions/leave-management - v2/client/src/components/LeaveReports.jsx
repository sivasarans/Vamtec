import React, { useState } from 'react';
import axios from 'axios';

const LeaveReports = () => {
  const [fileFormat, setFileFormat] = useState('excel'); // Default to Excel format

  const handleFormatChange = (event) => {
    setFileFormat(event.target.value); // Update the selected format
  };

  const handleDownload = async () => {
    try {
      // Request the file from the backend based on the selected format
      const response = await axios.get(`http://localhost:5000/download-leave-requests?format=${fileFormat}`, {
        responseType: 'blob', // Ensure we get the file as a blob
      });

      const fileExtension = fileFormat === 'excel' ? '.xlsx' : '.csv';
      const fileName = `LeaveRequests${fileExtension}`;

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Specify file name with extension
      document.body.appendChild(link);
      link.click(); // Trigger download
      link.remove(); // Clean up after download
    } catch (error) {
      console.error('Error downloading file', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2">Select File Format</label>
        <select
          value={fileFormat}
          onChange={handleFormatChange}
          className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="excel">Excel (.xlsx)</option>
          <option value="csv">CSV (.csv)</option>
        </select>
      </div>

      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Download Leave Requests
      </button>
    </div>
  );
};

export default LeaveReports;
