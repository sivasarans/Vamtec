import React, { useState, useContext , useMemo} from "react";
import { useNavigate } from 'react-router-dom';
import { Change } from "./Page";




function State() {
    // const navigate = useNavigate();
    const {show,setshow} = useContext(Change);
    // const [countcount, setcountcount] = useState(0); //remove

    // const memosample = useMemo(() => { //remove
    //     return setshow("Register"); //remove
    //   }, [countcount]); //remove


    const [country, setCountry] = useState('');
    const [stateName, setStateName] = useState('');
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'countrySelect') setCountry(value);
        else if (id === 'stateName') setStateName(value);
        
        // Clear error when input changes
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
    };

    const validateForm = () => {
        const formErrors = {};
        
        // Country validation
        if (!country) formErrors.countrySelect = "Please select a country.";
        
        // State name validation
        if (!stateName) formErrors.stateName = "State name is required.";
        else if (stateName.length < 3) formErrors.stateName = "State name should be at least 3 characters.";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("State added/updated successfully!");
            // Clear the form
            setCountry('');
            setStateName('');
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded shadow-md w-96">
            {/* //remove */}
                <button onClick={() => setshow("Register")} type="button" className="rounded border-gray-300 bg-gray-500 text-white p-2 mb-4">
                    Back
                </button>
                <h2 className="text-2xl font-bold mb-4">Add/Update State</h2>
                <form id="stateForm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="countrySelect" className="block text-sm font-medium text-gray-700">Select Country</label>
                        <select 
                            id="countrySelect" 
                            value={country} 
                            onChange={handleInputChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded" 
                            
                        >
                            <option value="">Choose a country</option>
                            <option value="country-1">country-1</option>
                            <option value="country-1">country-2</option>

                            {/* Add actual country options here */}
                        </select>
                        {errors.countrySelect && <p className="text-red-500 text-sm">{errors.countrySelect}</p>}
                    </div>
                    <div className="mb-4" id="stateInputDiv" style={{ display: "block" }}>
                        <label htmlFor="stateName" className="block text-sm font-medium text-gray-700">State Name</label>
                        <input 
                            type="text" 
                            id="stateName" 
                            value={stateName} 
                            onChange={handleInputChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded" 
                             
                        />
                        {errors.stateName && <p className="text-red-500 text-sm">{errors.stateName}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                        Add/Update State
                    </button>
                </form>
                <h2 className="text-xl font-bold mt-4">States List</h2>
                <table id="statesTable" className="min-w-full mt-2 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Country</th>
                            <th className="border border-gray-300 p-2">State</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* States will be appended here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default State;
