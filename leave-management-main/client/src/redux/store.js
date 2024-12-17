import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import leavestatusData from './leavestatus';

const store = configureStore({
  reducer: {
    user: userReducer,
    leavestatus: leavestatusData, // Add the leavestatusData slice here. Adjust the path if necessary.
  },
});

export default store;
