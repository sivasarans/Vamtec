import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import registerService from '../services/registerService';

export const fetchRecords = createAsyncThunk('register/fetchRecords', async () => {
  try {const data = await registerService.fetchRecords(); return data;  } 
  catch (error) { return rejectWithValue(error.message);}});

export const addOrUpdateRecord = createAsyncThunk('register/addOrUpdateRecord',
  async ({ formData, editId, file }, { dispatch, rejectWithValue }) => {
    try {
      const message = await registerService.addOrUpdateRecord(formData, editId, file);
      dispatch(fetchRecords()); return message;} 
    catch (error) { return rejectWithValue(error.message);}});

export const deleteRecord = createAsyncThunk('register/deleteRecord', async (id, { dispatch, rejectWithValue }) => {
  try {
    const message = await registerService.deleteRecord(id);
    dispatch(fetchRecords()); return message;} 
  catch (error) {
return rejectWithValue(error.message);
  }
});

const registerSlice = createSlice({
  name: 'register',
  initialState: { registerData: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchRecords.fulfilled, (state, { payload }) => { state.loading = false; state.registerData = payload; })
      .addCase(fetchRecords.rejected, (state, { payload }) => { state.loading = false; state.error = payload; })
      .addCase(addOrUpdateRecord.rejected, (state, { payload }) => { state.error = payload; })
      .addCase(deleteRecord.rejected, (state, { payload }) => { state.error = payload; });
  },
});

export default registerSlice.reducer;
