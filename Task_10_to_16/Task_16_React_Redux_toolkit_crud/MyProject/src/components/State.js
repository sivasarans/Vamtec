import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, deleteTask } from "../redux/stateSlice";  // stateSlice is used for state operations

function State() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ country: '', stateName: '' });
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();

    // Access country list from Redux store
    const countryList = useSelector((state) => state.country.tasks); // fetch countries from countrySlice
    const displayData = useSelector((state) => state.state.tasks); // fetch states from stateSlice

    useEffect(() => {
        // You can add any other side effects here if needed
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
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
                dispatch(addTask(formData));  // dispatch to add new state
                console.log("State added successfully!");
            } else {
                dispatch(editTask({ ...formData, id: editId }));  // dispatch to edit state
                console.log("State updated successfully!");
            }
            setFormData({ country: '', stateName: '' });
            setEditId(null);  // Reset edit mode
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteTask(id));  // Dispatch delete action for state
        console.log("State deleted successfully!");
    };

    const handleEdit = (id) => {
        const stateToEdit = displayData.find((state) => state.id === id);
        
        setFormData(stateToEdit);
        setEditId(id);  // Set state to edit mode
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
