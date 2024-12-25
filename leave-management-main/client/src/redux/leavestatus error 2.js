import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeaveData = createAsyncThunk(
  'leave/fetchLeaveData',
  async () => {
    const response = await axios.get('http://localhost:5000/leave');
    console.log(response.status);
    return response.data; // Return the fetched leave data
  }
);

export const applyLeave = createAsyncThunk(
  "leavestatus/applyLeave",
  async (leaveRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/leave/apply_leave', leaveRequest);
      if (response.status === 200 || response.status === 201) {
        // Reduce leave balance after applying leave
        const reduceLeaveBalanceResponse = await axios.put('http://localhost:5000/leave/reduce_leave_balance', {
          user_id: leaveRequest.user_id,
          leave_type: leaveRequest.leave_type.toLowerCase(),
          leave_days: leaveRequest.leave_days
        });
        return reduceLeaveBalanceResponse.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


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

  
const leavestatusData = createSlice({ name: "leavestatus",initialState:{leavestatusData:[], loading:false, err:null, leavebalance:[],
  applyleave_success_message:"",applyleave_success_message_type:"",
},
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
        })
        .addCase(fetchLeaveData.fulfilled, (state, action) => {
          state.leavebalance = action.payload; // Store fetched leave data in state
          // state.loading = false;
        })
        .addCase(applyLeave.fulfilled, (state, action) => {
          state.leavebalance = action.payload;
          state.applyleave_success_message = "Leave applied successfully!";
          state.applyleave_success_message_type = "success";
          // Optionally, you can handle any updates in state if needed after applying leave
        })
    }});

export default leavestatusData.reducer;