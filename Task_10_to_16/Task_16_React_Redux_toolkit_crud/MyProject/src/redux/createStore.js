import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Adjust path if needed
import countryReducer from "./countrySlice"; // Adjust path as needed
import stateReducer from "./stateSlice"; // Import the state slice
import registerReducer from "./registerSlice"; // Import the state slice

const store = configureStore({
  reducer: {
    auth: authReducer, // logging the refister by auth
    country: countryReducer, // Register the `country` reducer
    state: stateReducer, // Map the `state` key to `stateReducer`
    register: registerReducer, // Map the `state` key to `stateReducer`
  }})
export default store;
