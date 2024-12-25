import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPermissions } from '../../redux/permissionsSlice';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, LineChart, Line, Legend, Tooltip, Cell, ResponsiveContainer, CartesianGrid } from 'recharts';

const PermissionsChart = ({ showFilters = true }) => {
  const dispatch = useDispatch();
  const { permissionRequests, loading, error } = useSelector((state) => state.permissions);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const filterDataByDate = (data) => {
    return data.filter((permission) => {
      const permissionDate = new Date(permission.date);
      return (
        (!fromDate || permissionDate >= new Date(fromDate)) &&
        (!toDate || permissionDate <= new Date(toDate))
      );
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-'); // Convert to "dd-MMM-yyyy"
  };

  const permissionCounts = (permissionRequests || [])
    .filter((permission) => !fromDate || !toDate || filterDataByDate([permission]).length > 0)
    .reduce(
      (counts, permission) => {
        counts[permission.status] = (counts[permission.status] || 0) + 1;
        return counts;
      },
      { Approved: 0, Rejected: 0, Pending: 0 }
    );

  const permissionStatusData = [
    { name: 'Approved', count: permissionCounts.Approved || 0, fill: '#32CD32' },
    { name: 'Rejected', count: permissionCounts.Rejected || 0, fill: '#FF0000' },
    { name: 'Pending', count: permissionCounts.Pending || 0, fill: '#FFA07A' },
  ];

  const filteredPermissionsByDate = filterDataByDate(permissionRequests)
    .map((permission) => ({
      date: formatDate(permission.date),
      approved: permission.status === 'Approved' ? 1 : 0,
      rejected: permission.status === 'Rejected' ? 1 : 0,
      pending: permission.status === 'Pending' ? 1 : 0,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by ascending date

  const totalPermissionsTrend = filteredPermissionsByDate.reduce((trend, curr) => {
    const dateEntry = trend.find((entry) => entry.date === curr.date);
    if (dateEntry) {
      dateEntry.total += 1;
    } else {
      trend.push({ date: curr.date, total: 1 });
    }
    return trend;
  }, []);

  return (
    <div className="permission-summary">
      {loading ? (
        <p>Loading permission data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="text-sm text-gray-700 mb-4">
          {showFilters && (
            <div className="mb-4">
              <label className="block mb-2 font-bold">Select Date Range:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border p-2 mr-4"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border p-2"
              />
            </div>
          )}

          {/* <div
            className="charts-container"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '32px',
            }}
          > */}
                <div className="charts-container" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* Pie Chart */}
            <div
              className="chart-container"
              style={{
                width: '30%',
                minWidth: '300px',
                borderRadius: '25px',
                padding: '16px',
                backgroundColor: 'rgb(233, 231, 255)',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Permission Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={permissionStatusData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, count }) => `${name}: ${count}`}
                    labelLine
                  >
                    {permissionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div
              className="chart-container"
              style={{
                width: '30%',
                minWidth: '300px',
                borderRadius: '25px',
                padding: '20px',
                backgroundColor: 'rgb(233, 231, 255)',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Daily Permission Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredPermissionsByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', dy: 10 , style: { fontSize: '14px', fontWeight: 'bold' }}} />
                  <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft', dx: -10 , style: { fontSize: '14px', fontWeight: 'bold' }}} />
                  <Bar dataKey="approved" fill="#32CD32" />
                  <Bar dataKey="rejected" fill="#FF0000" />
                  <Bar dataKey="pending" fill="#FFA07A" />
                  <Legend />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div
              className="chart-container"
              style={{
                width: '30%',
                minWidth: '300px',
                borderRadius: '25px',
                padding: '16px',
                backgroundColor: 'rgb(233, 231, 255)',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Trend of Total Permissions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={totalPermissionsTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', dy: 10 }} />
                  <YAxis label={{ value: 'Total Requests', angle: -90, position: 'insideLeft', dx: -10 }} />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                  <Legend />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsChart;
