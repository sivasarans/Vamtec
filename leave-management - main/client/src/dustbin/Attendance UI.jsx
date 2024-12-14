import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  const rows = [
    { id: 1, name: "John Doe", status: "Present", date: "2024-12-10" },
    { id: 2, name: "Jane Smith", status: "Absent", date: "2024-12-10" },
  ];

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];

  return (
    <div>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default Attendance;
