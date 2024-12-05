import React, { useState, useEffect } from "react";

const LeaveForm = () => {
  const [leaveType, setLeaveType] = useState("EL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("Enter reason");
  const [leaveDays, setLeaveDays] = useState(0);
  const [selecttype, setselecttype] = useState(0);


  // Set default dates (current and next date)
  useEffect(() => {
    const today = new Date();
    // const tomorrow = new Date();
    // tomorrow.setDate(today.getDate() + 1);

    setFromDate(today.toISOString().split("T")[0]);
    setToDate(today.toISOString().split("T")[0]);
    setLeaveDays(1); // Default leave days = 1  
  }, []);

  // Function to calculate leave days
  const calculateLeaveDays = () => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (to >= from) {
        const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1; // Include both dates
        setLeaveDays(days);
      } else {
        setLeaveDays(0); // Invalid range
      }
    }
  };

  // Update leave days whenever `fromDate` or `toDate` changes
  useEffect(() => {
    calculateLeaveDays();
  }, [fromDate, toDate]);

  // Handle apply button
  const handleApply = () => {
    if (leaveDays > 0) {
      alert(`Leave Request Submitted: 
        Type: ${leaveType}
        From: ${fromDate}
        To: ${toDate}
        Days: ${leaveDays}
        Reason: ${reason}`);
    } else {
      alert("Invalid leave range! Please correct the dates.");
    }
  };

  // Handle reset button
  const handleReset = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setLeaveType("");
    setFromDate(today.toISOString().split("T")[0]);
    setToDate(today.toISOString().split("T")[0]);
    setReason("");
    setLeaveDays(1);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold text-orange-500 text-center mb-6">Apply Leave</h2>
      
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Leave Type</label>
        <select
  className="w-full p-2 border border-gray-300 rounded-md"
  value={leaveType}
  onChange={(e) => setLeaveType(e.target.value)}
>
  <option value="">Select Leave Type</option>
  <option value="EL">Earned Leave</option>
  <option value="SL">Sick Leave</option>
  <option value="CL">Casual Leave</option>
  <option value="CO">Compensatory Off</option>
  <option value="SO">Special Off</option>
  <option value="SML">Special Medical Leave</option>
  <option value="ML">Maternity Leave</option>
  <option value="CW">Child Welfare Leave</option>
  <option value="OOD">On Official Duty</option>
  {/* <option value="HL">Half-Day Leave</option> */}
  <option value="COL">Compensatory Leave</option>
  <option value="WFH">Work From Home</option>
  <option value="WO">Weekly Off</option>
  <option value="MP">Maternity/Paternity Leave</option>
  {/* <option value="A">Absent</option> */}
</select>
<p className="text-sm text-blue-500">{`${leaveType} Balance : ${selecttype} Day(s) Left`}</p>


      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">From</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">To</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-blue-500">{`Applying for ${leaveDays} Day(s) Leave`}</p>
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Reason</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason"
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleApply}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default LeaveForm;
