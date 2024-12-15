import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: '',
    role: '',
    user_id: '',
    email: '',
    profile_picture: '',
    logged_user: null, // Variable to store the full user data
  },
  reducers: {
    setUser(state, action) {
      const userData = action.payload;
      // Set the full user data in logged_user
      state.logged_user = userData;
      
      // Optionally update individual fields if needed
      state.id = userData.id;
      state.name = userData.name;
      state.role = userData.role;
      state.user_id = userData.user_id;
      state.email = userData.email;
      state.profile_picture = userData.profile_picture;
    },
    clearUser(state) {
      return {
        id: null,
        name: '',
        role: '',
        user_id: '',
        email: '',
        profile_picture: '',
        logged_user: null, // Clear logged user data
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
