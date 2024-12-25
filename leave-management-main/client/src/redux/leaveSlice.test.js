// import { configureStore } from '@reduxjs/toolkit';
// import leaveReducer, {
//   fetchLeaveData,
//   applyLeave,
//   fetchLeaveRequests,
//   deleteLeaveRequests,
//   updateLeaveStatus
// } from './leaveSlice'; // Import your slice

// // Mock Axios
// jest.mock('axios');
// import axios from 'axios';

// describe('leaveSlice async thunks', () => {
//   // Setup a Redux store
//   let store;
  
//   beforeEach(() => {
//     store = configureStore({
//       reducer: {
//         leavestatus: leaveReducer,
//       },
//     });
//   });

//   test('fetchLeaveData should fetch and store leave balance data', async () => {
//     const mockLeaveData = [
//       { leave_type: 'EL', leave_days: 10 },
//       { leave_type: 'SL', leave_days: 5 },
//     ];
//     axios.get.mockResolvedValue({ data: mockLeaveData });

//     await store.dispatch(fetchLeaveData());

//     const state = store.getState().leavestatus;
//     expect(state.leavebalance).toEqual(mockLeaveData);
//   });

//   test('applyLeave should apply leave and reduce leave balance', async () => {
//     const mockLeaveRequest = {
//       user_id: 1,
//       leave_type: 'EL',
//       leave_days: 2,
//       from_date: '2024-01-01',
//       to_date: '2024-01-03',
//     };
//     const mockReducedLeaveBalance = [
//       { leave_type: 'EL', leave_days: 8 },
//       { leave_type: 'SL', leave_days: 5 },
//     ];
//     axios.post.mockResolvedValue({ status: 200 });
//     axios.put.mockResolvedValue({ data: mockReducedLeaveBalance });

//     await store.dispatch(applyLeave(mockLeaveRequest));

//     const state = store.getState().leavestatus;
//     expect(state.leavebalance).toEqual(mockReducedLeaveBalance);
//     expect(state.applyleave_success_message).toBe('Leave applied successfully!');
//   });

//   test('fetchLeaveRequests should fetch and store leave requests', async () => {
//     const mockLeaveRequests = [
//       { id: 1, status: 'approved', leave_type: 'EL' },
//       { id: 2, status: 'pending', leave_type: 'SL' },
//     ];
//     axios.get.mockResolvedValue({ data: mockLeaveRequests });

//     await store.dispatch(fetchLeaveRequests());

//     const state = store.getState().leavestatus;
//     expect(state.leavestatusData).toEqual(mockLeaveRequests);
//   });

//   test('deleteLeaveRequests should remove leave request from state', async () => {
//     const mockLeaveRequests = [
//       { id: 1, status: 'approved', leave_type: 'EL' },
//       { id: 2, status: 'pending', leave_type: 'SL' },
//     ];
//     axios.delete.mockResolvedValue({ status: 200 });

//     store.dispatch(fetchLeaveRequests()); // First load leave requests
//     store.dispatch(deleteLeaveRequests(1)); // Delete leave request with id 1

//     const state = store.getState().leavestatus;
//     expect(state.leavestatusData).toEqual([{ id: 2, status: 'pending', leave_type: 'SL' }]);
//   });

//   test('updateLeaveStatus should update the leave request status', async () => {
//     const mockUpdatedRequest = {
//       requestId: 1,
//       newStatus: 'approved',
//       rejectReason: '',
//     };
//     const mockLeaveRequests = [
//       { id: 1, status: 'pending', leave_type: 'EL' },
//       { id: 2, status: 'pending', leave_type: 'SL' },
//     ];
//     axios.put.mockResolvedValue({ status: 200 });

//     store.dispatch(fetchLeaveRequests()); // First load leave requests
//     await store.dispatch(updateLeaveStatus(mockUpdatedRequest)); // Update status of request with id 1

//     const state = store.getState().leavestatus;
//     expect(state.leavestatusData).toEqual([
//       { id: 1, status: 'approved', leave_type: 'EL' },
//       { id: 2, status: 'pending', leave_type: 'SL' },
//     ]);
//   });
// });
