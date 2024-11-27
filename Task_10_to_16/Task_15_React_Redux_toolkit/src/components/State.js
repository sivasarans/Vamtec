import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { dbx } from '../App';  // Assuming dbx is imported from App.js

function State() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ country: '', stateName: '' });
    const [errors, setErrors] = useState({});
    const [displayData, setDisplayData] = useState([]);
    const [countryList, setCountryList] = useState([]); // For holding countries from the DB
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = () => {
        if (dbx) {
            const countryGet = dbx.transaction("country", "readonly").objectStore("country").getAll();
            countryGet.onsuccess = (e) => {
                setCountryList(e.target.result);
                console.log("Countries fetched successfully!");
            };
            countryGet.onerror = (e) => {
                console.error("Error fetching countries:", e.target.error);
            };
        } else {
            console.log("dbx error (not initialized)");
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' })); // Clear error for the input
    };

    const validateForm = () => {
        const formErrors = {};
        if (!formData.country) {
            formErrors.country = "Please select a country.";
        }
        if (!formData.stateName) {
            formErrors.stateName = "State name is required.";
        } else if (formData.stateName.length < 3) {
            formErrors.stateName = "State name should be at least 3 characters.";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!editId) {
                alert("State added successfully!");
                if (dbx) {
                    const stateAdd = dbx.transaction("state", "readwrite").objectStore("state").add(formData);
                    stateAdd.onsuccess = () => {
                        console.log("State added successfully!");
                        fetchStates();
                        setFormData({ country: '', stateName: '' });
                    };
                    stateAdd.onerror = () => console.error("Error adding state.");
                } else {
                    console.log("dbx error (not initialized)");
                }
            } else {
                alert("State updated successfully!");
                if (dbx) {
                    const stateUpdate = dbx.transaction("state", "readwrite").objectStore("state").put({ ...formData, id: editId });
                    stateUpdate.onsuccess = () => {
                        console.log("State updated successfully!");
                        fetchStates();
                        setFormData({ country: '', stateName: '' });
                        setEditId(null); // Reset edit mode
                    };
                    stateUpdate.onerror = () => console.error("Error updating state.");
                } else {
                    console.log("dbx error (not initialized)");
                }
            }
        }
    };

    const fetchStates = () => {
        if (dbx) {
            const stateGet = dbx.transaction("state", "readonly").objectStore("state").getAll();
            stateGet.onsuccess = (e) => {
                setDisplayData(e.target.result);
                console.log("States fetched successfully!");
            };
            stateGet.onerror = (e) => {
                console.error("Error fetching states:", e.target.error);
            };
        } else {
            console.log("dbx error (not initialized)");
        }
    };

    const handleDelete = (id) => {
        if (dbx) {
            const stateDelete = dbx.transaction("state", "readwrite").objectStore("state").delete(id);
            stateDelete.onsuccess = () => {
                console.log(`State with ID ${id} deleted successfully.`);
                fetchStates();
            };
            stateDelete.onerror = (e) => {
                console.error("Error deleting data:", e.target.error);
            };
        } else {
            console.log("dbx error (not initialized)");
        }
    };

    const handleEdit = (id) => {
        if (dbx) {
            const stateStore = dbx.transaction("state", "readwrite").objectStore("state");
            const request = stateStore.get(id);
            request.onsuccess = (e) => {
                const data = e.target.result;
                setFormData({ ...data });
                setEditId(id); // Enter edit mode
            };
            request.onerror = (e) => {
                console.error("Error retrieving data for editing:", e.target.error);
            };
        } else {
            console.log("dbx error (not initialized)");
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <button onClick={() => navigate('/')} className="rounded border-gray-300 bg-gray-500 text-white p-2 mb-4">
                    Back
                </button>
                <h2 className="text-2xl font-bold mb-4">Add/Update State</h2>
                <form id="stateForm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Select Country</label>
                        <select
                            id="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Choose a country</option>
                            {countryList.map((country, index) => (
                                <option key={index} value={country.countryName}>{country.countryName}</option>
                            ))}
                        </select>
                        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stateName" className="block text-sm font-medium text-gray-700">State Name</label>
                        <input
                            type="text"
                            id="stateName"
                            value={formData.stateName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.stateName && <p className="text-red-500 text-sm">{errors.stateName}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                        {editId ? "Update State" : "Add State"}
                    </button>
                </form>

                <h2 className="text-xl font-bold mt-6 mb-4">States List</h2>
                <button onClick={fetchStates} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                    Load States
                </button>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-2 border-b text-left">ID</th>
                            <th className="py-2 px-2 border-b text-left">Country</th>
                            <th className="py-2 px-2 border-b text-left">State Name</th>
                            <th className="py-2 px-2 border-b text-left">Edit</th>
                            <th className="py-2 px-2 border-b text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((value, index) => (
                            <tr key={index}>
                                <td className="py-1 px-2">{value.id}</td>
                                <td className="py-1 px-2">{value.country}</td>
                                <td className="py-1 px-2">{value.stateName}</td>
                                <td className="py-1 px-2">
                                    <button onClick={() => handleEdit(value.id)} className="text-blue-500">Edit</button>
                                </td>
                                <td className="py-1 px-2">
                                    <button onClick={() => handleDelete(value.id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default State;
