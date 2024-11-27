import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const createStore = configureStore({
    reducer:{
        auth:authReducer,
    }
})

export default createStore;