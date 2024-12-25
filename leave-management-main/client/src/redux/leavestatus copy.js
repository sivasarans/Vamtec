import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeaveRequests = createAsyncThunk(
    "leavestatus/fetchLeaveRequests",
    async () => {
      const response = await axios.get("http://localhost:5000/leave/get-all-status");
      return response.data; // Extract and return only the data
    }
  );

export const deleteLeaveRequests = createAsyncThunk("delete-leave-requests", async (requestId) => {
  console.log("Request ID:", requestId);

  const response = await axios.delete(`http://localhost:5000/leave/delete-leave-request/${requestId}`);
  return requestId; // Extract and return only the data
});

export const updateLeaveStatus = createAsyncThunk(
  "leavestatus/updateLeaveStatus",
  async ({ requestId, newStatus, rejectReason = '',leave_days, leave_type, user_id  }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/leave/update-leave-status/${requestId}`,
        {
          status: newStatus,
          reject_reason: rejectReason,
          leave_days:leave_days,
          leave_type:leave_type,
          user_id:user_id,
        }
      );
      return { requestId, newStatus, rejectReason };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

  
const leavestatusData = createSlice({ name: "leavestatus",initialState:{leavestatusData:[], loading:false, err:null},
    reducers: {},
    extraReducers: (builder) => {builder
        .addCase(fetchLeaveRequests.fulfilled, (state,action) => {
            state.leavestatusData = action.payload;
            state.loading = false;
        })
        .addCase(deleteLeaveRequests.fulfilled, (state, action) => {
          state.leavestatusData = state.leavestatusData.filter(
            (request) => request.id !== action.payload
          );})
        .addCase(updateLeaveStatus.fulfilled, (state, action) => {
          const { requestId, newStatus, rejectReason } = action.payload;
          state.leavestatusData = state.leavestatusData.map((request) =>
            request.id === requestId
              ? { ...request, status: newStatus, reject_reason: rejectReason }
              : request
          );
          state.loading = false;
        });
    }});

export default leavestatusData.reducer;