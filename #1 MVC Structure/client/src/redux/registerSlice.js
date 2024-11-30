import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchRecords = createAsyncThunk('register/fetchRecords', async () => {
  try {
    const { data } = await axios.get(`${API_URL}/countries/register`);
    return data;
  } catch (error) {
    return (error.message);
  }
});

export const addOrUpdateRecord = createAsyncThunk(
  'register/addOrUpdateRecord',
  async ({ formData, editId, file }, { dispatch, rejectWithValue }) => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (file) data.append('file', file);
    const method = editId ? 'put' : 'post';
    const url = editId ? `${API_URL}/register/${editId}` : `${API_URL}/register/`;

    try {
      await axios[method](url, data);
      dispatch(fetchRecords());
      return editId ? 'Updated successfully!' : 'Added successfully!';
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRecord = createAsyncThunk('register/deleteRecord', async (id, { dispatch, rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/register/${id}`);
    dispatch(fetchRecords());
    return 'Deleted successfully!';
  } catch (error) {
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
