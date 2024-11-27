import {createSlice} from "@reduxjs/toolkit";


const authSlice=createSlice({

    name: "auth",
    initialState: { LogIn:false, user:null},
    reducers:{ login:(state,action)=>{state.LogIn=true; state.user=action.payload},
               logout:(state)=>{state.LogIn=false; state.user=null}
    }});
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;