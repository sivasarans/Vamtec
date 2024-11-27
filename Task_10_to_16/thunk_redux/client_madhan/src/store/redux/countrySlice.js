import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import countryService from '../../services/countryServices';

// Async actions
export const fetchCountries = createAsyncThunk('countries/fetchAll', async () => {
    return await countryService.getCountries();
});

export const addCountry = createAsyncThunk('countries/add', async (country) => {
    return await countryService.addCountry(country);
});

export const deleteCountry = createAsyncThunk('countries/delete', async (id) => {
    await countryService.deleteCountry(id);
    return id;
});
export const updateCountry = createAsyncThunk('countries/update', async (country) => {
  console.log(country.id,country);
  return await countryService.updateCountry(country.id,country);
});

// Slice
const countrySlice = createSlice({
    name: 'countries',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addCountry.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteCountry.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(updateCountry.fulfilled, (state, action) => {
              const index = state.items.findIndex((item) => item.id === action.payload.id);
              if (index !== -1) {
                state.items[index] = action.payload; 
                 }
          });
    },
});

export default countrySlice.reducer;