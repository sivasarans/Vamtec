import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';

const LeaveStatusChart = () => {
  const [fromDate, setFromDate] = useState('2022-01-01');
  const [toDate, setToDate] = useState('2022-01-20');
  const [leaveStatus, setLeaveStatus] = useState([
    { name: 'Approved', count: 10 },
    { name: 'Rejected', count: 5 },
    { name: 'Pending', count: 8 },
  ]);
  const [leaveStatusByDate, setLeaveStatusByDate] = useState([
    { date: '2022-01-01', approved: 2, rejected: 1, pending: 1 },
    { date: '2022-01-02', approved: 3, rejected: 1, pending: 2 },
    { date: '2022-01-03', approved: 5, rejected: 3, pending: 5 },
    { date: '2022-01-04', approved: 2, rejected: 1, pending: 1 },
    { date: '2022-01-05', approved: 3, rejected: 1, pending: 2 },
    { date: '2022-01-06', approved: 5, rejected: 3, pending: 5 },
    { date: '2022-01-07', approved: 2, rejected: 1, pending: 1 },
    { date: '2022-01-08', approved: 3, rejected: 1, pending: 2 },
    { date: '2022-01-09', approved: 5, rejected: 3, pending: 5 },
    { date: '2022-01-10', approved: 2, rejected: 1, pending: 1 },
    { date: '2022-01-11', approved: 3, rejected: 1, pending: 2 },
    { date: '2022-01-12', approved: 5, rejected: 3, pending: 5 },
    { date: '2022-01-13', approved: 2, rejected: 1, pending: 1 },
    { date: '2022-01-14', approved: 3, rejected: 1, pending: 2 },
    { date: '2022-01-15', approved: 5, rejected: 3, pending: 5 },
    { date: '2022-01-16', approved: 2, rejected: 1, pending: 1 },
    { date: '2022-01-17', approved: 3, rejected: 1, pending: 2 },
    { date: '2022-01-18', approved: 5, rejected: 3, pending: 5 },
    { date: '2022-01-19', approved: 2, rejected: 1, pending: 1 },
    { date: '2022-01-20', approved: 3, rejected: 1, pending: 2 },
  ]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else {
      setToDate(value);
    }
  };

  const filteredLeaveStatusByDate = leaveStatusByDate.filter((item) => {
    const date = new Date(item.date);
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    return date >= fromDateObj && date <= toDateObj;
  });

  const approvedCount = filteredLeaveStatusByDate.reduce((acc, current) => acc + current.approved, 0);
  const rejectedCount = filteredLeaveStatusByDate.reduce((acc, current) => acc + current.rejected, 0);
  const pendingCount = filteredLeaveStatusByDate.reduce((acc, current) => acc + current.pending, 0);

  const leaveStatusData = [
    { name: 'Approved', count: approvedCount },
    { name: 'Rejected', count: rejectedCount },
    { name: 'Pending', count: pendingCount },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="date"
          name="fromDate"
          value={fromDate}
          onChange={handleDateChange}
          className="border-2 border-gray-200 rounded-lg p-2"
        />
        <input
          type="date"
          name="toDate"
          value={toDate}
          onChange={handleDateChange}
          className="border-2 border-gray-200 rounded-lg p-2"
        />
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 mr-4">
          <PieChart width={400} height={400}>
            <Pie
              data={leaveStatusData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
            />
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
        <div className="w-1/2 ml-4">
          <BarChart width={400} height={400} data={filteredLeaveStatusByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Bar dataKey="approved" fill="#8884d8" />
            <Bar dataKey="rejected" fill="#82ca9d" />
            <Bar dataKey="pending" fill="#ffc658" />
            <Legend />
            <Tooltip />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatusChart;