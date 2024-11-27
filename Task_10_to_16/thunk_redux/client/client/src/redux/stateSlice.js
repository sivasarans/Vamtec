import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states: [],
};

const stateSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    setStates: (state, action) => {
      state.states = action.payload;
    },
    addState: (state, action) => {
      state.states.push(action.payload);
    },
    deleteState: (state, action) => {
      state.states = state.states.filter(
        (state) => state.id !== action.payload
      );
    },
  },
});

export const { setStates, addState, deleteState } = stateSlice.actions;

export default stateSlice.reducer;
