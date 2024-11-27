import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./redux/countrySlice";
import stateReducer from "./redux/stateSlice";
import userReducer from "./redux/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    countries: countryReducer,
    states : stateReducer
  },
});
