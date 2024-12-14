import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as stateService from "../services/stateService";

// Thunks
export const fetchStatesThunk = createAsyncThunk(
  "states/fetchAll",
  async () => {
    const response = await stateService.fetchStates();
    return response;
  }
);

export const addStateThunk = createAsyncThunk(
  "states/add",
  async (stateData) => {
    const response = await stateService.addState(stateData);
    return response;
  }
);

export const updateStateThunk = createAsyncThunk(
  "states/update",
  async ({ id, stateData }) => {
    const response = await stateService.updateState(id, stateData);
    return { id, ...response };
  }
);

export const deleteStateThunk = createAsyncThunk(
  "states/delete",
  async (id) => {
    await stateService.deleteState(id);
    return id; // Return the deleted state's ID
  }
);

const initialState = {
  states: [],
  loading: false,
  error: null,
};

const stateSlice = createSlice({
  name: "states",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch states
    builder.addCase(fetchStatesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStatesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.states = action.payload;
    });
    builder.addCase(fetchStatesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add state
    builder.addCase(addStateThunk.fulfilled, (state, action) => {
      state.states.push(action.payload);
    });

    // Update state
    builder.addCase(updateStateThunk.fulfilled, (state, action) => {
      const index = state.states.findIndex((s) => s.id === action.payload.id);
      if (index >= 0) {
        state.states[index] = action.payload;
      }
    });

    // Delete state
    builder.addCase(deleteStateThunk.fulfilled, (state, action) => {
      state.states = state.states.filter((state) => state.id !== action.payload);
    });
  },
});

export default stateSlice.reducer;
