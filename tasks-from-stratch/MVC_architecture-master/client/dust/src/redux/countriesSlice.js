import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import countryService from "../services/countryService";

export const fetchCountries = createAsyncThunk("countries/fetchAll", async () => {
  return await countryService.fetch();
});

export const addCountry = createAsyncThunk("countries/add", async (data) => {
  return await countryService.add(data);
});

export const updateCountry = createAsyncThunk("countries/update", async ({ id, data }) => {
  return await countryService.update(id, data);
});

export const deleteCountry = createAsyncThunk("countries/delete", async (id) => {
  await countryService.delete(id);
  return { id }; // Return the ID for use in the reducer

});

// Slice
const countriesSlice = createSlice({
  name: "countries",
  initialState: { data: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateCountry.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteCountry.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      });
  },
});

export default countriesSlice.reducer;
