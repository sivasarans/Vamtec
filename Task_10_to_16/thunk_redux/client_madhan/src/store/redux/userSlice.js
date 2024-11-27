import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userServices';

// Async actions
export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
    return await userService.getUsers();
});

export const addUser = createAsyncThunk('users/add', async (user) => {
  console.log(user.id,user);
    return await userService.addUser(user);
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
    await userService.deleteUser(id);
    return id;
});
export const updateUser = createAsyncThunk('users/update', async (user) => {
  console.log(user.id,user);
  return await userService.updateUser(user.id,user);
});

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        userlist: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.userlist = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.userlist.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.userlist = state.userlist.filter((item) => item.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
              const index = state.userlist.findIndex((item) => item.id === action.payload.id);
              if (index !== -1) {
                state.userlist[index] = action.payload; 
                 }
          });
    },
});

export default userSlice.reducer;