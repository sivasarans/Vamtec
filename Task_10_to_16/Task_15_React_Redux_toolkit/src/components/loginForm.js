import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import Register from "./Register";
import Country from "./Country";
import State from "./State";

const Loginform = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To show error message

    
    // Fix: Correctly use useSelector to get the state
    const LogIn = useSelector((state) => state.auth.LogIn);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        // e.preventDefault();

        if (!username || !password) {
            setErrorMessage("Both fields are required.");
        } else {
            // Reset error message if validation passes
            setErrorMessage("");
            
            dispatch(login({ username, password }));
        }
    };

    return (
        <div>
            {LogIn ? (
                <div>
                    <h2>Welcome {user.username}</h2>
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4" onClick={() => dispatch(logout())}>Logout</button>
                    <Register />
                </div>
            ) : (
                <div>
                    <fieldset class="border border-green-500 bg-blue-100">
                    <h1> Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username} 
                        required 
                        className="mt-1 block w-full p-2 border border-green-500 rounded-md"
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="mt-1 block w-full p-2 border border-green-500 rounded-md"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                    />
                    {errorMessage && (
                            <div className="text-red-500 mt-2">{errorMessage}</div>)}
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 mt-5 mb-4" onClick={() => handleSubmit()}>Login</button>
                    </fieldset></div>
            )}
        </div>
    );
};

export default Loginform;
