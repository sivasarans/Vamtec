import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import Register from "./Register";
const Loginform = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const LogIn = useSelector((state) => state.auth.LogIn);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        if (!username || !password) { setErrorMessage("Both fields are required.")}
        else { setErrorMessage(""); dispatch(login({ username, password }))}}
    return (
        <div>
            {LogIn ? ( <div>
                    <h2 className="text-3xl font-bold mb-5">Welcome {user.username}</h2>
                    <button onClick={() => dispatch(logout())} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4" >Logout</button>
                    <Register /> </div>
            ) : (
                <div className="flex justify-center items-center h-screen bg-gray-100 m-5 p-5">
                <fieldset class="border border-green-500 bg-blue-100">
                    <h1 className="text-3xl font-bold mb-5"> Login</h1>
                    <input
                        type="text" placeholder="Username" value={username} 
                        onChange={(e) => setusername(e.target.value)}
                        className="mt-4 block w-full p-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                    <input
                        type="password" value={password}   
                        placeholder="Password" onChange={(e) => setpassword(e.target.value)}
                        className="mt-4 block w-full p-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"                     
                    />
                    {errorMessage && ( <div className="text-red-500 mt-2">{errorMessage}</div>)}
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 mt-5 mb-4" onClick={() => handleSubmit()}>Login</button>
                    </fieldset></div>
            )}  </div>)}
export default Loginform;
