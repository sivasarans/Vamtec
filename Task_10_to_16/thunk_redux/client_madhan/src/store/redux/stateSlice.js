import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import stateService from '../../services/stateServices';

// Async actions
export const fetchStates = createAsyncThunk('states/fetchAll', async () => {
    return await stateService.getStates();
});

export const addState = createAsyncThunk('states/add', async (state) => {
  console.log(state.id,state);
    return await stateService.addState(state);
});

export const deleteState = createAsyncThunk('states/delete', async (id) => {
    await stateService.deleteState(id);
    return id;
});
export const updateState = createAsyncThunk('states/update', async (state) => {
  console.log(state.id,state);
  return await stateService.updateState(state.id,state);
});

// Slice
const stateSlice = createSlice({
    name: 'states',
    initialState: {
        statelist: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStates.fulfilled, (state, action) => {
                state.statelist = action.payload;
                state.loading = false;
            })
            .addCase(fetchStates.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addState.fulfilled, (state, action) => {
                state.statelist.push(action.payload);
            })
            .addCase(deleteState.fulfilled, (state, action) => {
                state.statelist = state.statelist.filter((item) => item.id !== action.payload);
            })
            .addCase(updateState.fulfilled, (state, action) => {
              const index = state.statelist.findIndex((item) => item.id === action.payload.id);
              if (index !== -1) {
                state.statelist[index] = action.payload; 
                 }
          });
    },
});

export default stateSlice.reducer;