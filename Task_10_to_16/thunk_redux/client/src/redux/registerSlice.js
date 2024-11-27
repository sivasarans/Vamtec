import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerService from "../services/registerService";

// Thunks
export const fetchUsers = createAsyncThunk("register/fetchUsers", registerService.fetchUsers);
export const createUser = createAsyncThunk("register/createUser", registerService.createUser);
export const updateUser = createAsyncThunk("register/updateUser", ({ id, userData }) => 
  registerService.updateUser(id, userData)
);
export const deleteUser = createAsyncThunk("register/deleteUser", registerService.deleteUser);
export const getCountries = createAsyncThunk("register/getCountries", registerService.getCountries);
export const getStatesByCountry = createAsyncThunk("register/getStatesByCountry", registerService.getStatesByCountry);

// Slice
const registerSlice = createSlice({
  name: "register",
  initialState: { users: [], countries: [], states: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => { state.loading = false; state.users = payload; })
      .addCase(fetchUsers.rejected, (state, { error }) => { state.loading = false; state.error = error.message; })
      .addCase(createUser.fulfilled, (state, { payload }) => { state.users.push(payload); })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const idx = state.users.findIndex((user) => user.id === payload.id);
        if (idx !== -1) state.users[idx] = payload;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((user) => user.id !== payload.id);
      })
      .addCase(getCountries.fulfilled, (state, { payload }) => { state.countries = payload; })
      .addCase(getStatesByCountry.fulfilled, (state, { payload }) => { state.states = payload; });
  },
});

export default registerSlice.reducer;
