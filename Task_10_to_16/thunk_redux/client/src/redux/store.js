import { configureStore } from '@reduxjs/toolkit';
// import registerReducer from './registerSlice'; // Adjust path if necessary
import countriesReducer from './countriesSlice'; // Adjust path if necessary
import stateReducer from './stateSlice'; // Adjust path if necessary

const store = configureStore({
  reducer: {
    // register: registerReducer,
    countries: countriesReducer,
    states: stateReducer,
  },
});

export default store;
