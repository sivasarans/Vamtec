import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeaveRequests,
  deleteLeaveRequests,
  updateLeaveStatus,
} from "../redux/leavestatus";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

const EditToolbar = ({ setRows, setRowModesModel }) => {
  const handleAddClick = () => {
    const id = Date.now(); // Temporary ID for new rows
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        user_id: "",
        user_name: "",
        leave_type: "",
        from_date: "",
        to_date: "",
        leave_days: 0,
        reason: "",
        status: "Pending",
        applied_date: new Date().toISOString().split("T")[0],
        reject_reason: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "status" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add Row
      </Button>
    </GridToolbarContainer>
  );
};

const LeaveRequests = () => {
  const dispatch = useDispatch();
  const { leavestatusData, loading, error } = useSelector(
    (state) => state.leavestatus
  );

  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchLeaveRequests());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { field: "user_id", headerName: "User ID", width: 150, editable: true },
    { field: "user_name", headerName: "User Name", width: 200, editable: true },
    { field: "leave_type", headerName: "Leave Type", width: 150, editable: true },
    { field: "from_date", headerName: "From Date", width: 150, editable: true },
    { field: "to_date", headerName: "To Date", width: 150, editable: true },
    { field: "leave_days", headerName: "Leave Days", width: 120, editable: true },
    { field: "reason", headerName: "Reason", width: 250, editable: true },
    { field: "status", headerName: "Status", width: 150, editable: true },
    { field: "reject_reason", headerName: "Reject Reason", width: 200, editable: true },
    
    
  ];

  if (loading) return <p>Loading leave requests...</p>;
  if (error) return <p>Error fetching leave requests: {error.message || error}</p>;

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <h1>Leave Requests</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        
      />
    </Box>
  );
};
export default LeaveRequests;
