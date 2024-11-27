// src/redux/countrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const response = await fetch('http://localhost:5000/countries');
  return response.json();
});

export const addCountry = createAsyncThunk('countries/addCountry', async (country) => {
  const response = await fetch('http://localhost:5000/countries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(country),
  });
  if (!response.ok) throw new Error('Failed to add country');
  return response.json();
});

export const updateCountry = createAsyncThunk('countries/updateCountry', async ({ id, country }) => {
  const response = await fetch(`http://localhost:5000/countries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(country),
  });
  if (!response.ok) throw new Error('Failed to update country');
  return response.json();
});

export const deleteCountry = createAsyncThunk('countries/deleteCountry', async (id) => {
  await fetch(`http://localhost:5000/countries/${id}`, { method: 'DELETE' });
  return id;
});

// Slice
const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Countries
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Country
      .addCase(addCountry.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Update Country
      .addCase(updateCountry.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // Delete Country
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default countrySlice.reducer;
