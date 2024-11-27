import { useCallback, useEffect, useState } from "react";
import React from "react";
import { NavLink } from 'react-router-dom';
import RegisterTable from './RegisterTable';


function Register() {

    const [formData, setFormData] = useState({
        name: '', organization: '', email: '', password: '', numUsers: '',
        mobile: '', country: '', state: '', expireDays: ''
    });
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');  // To store selected country

    const [isEditing, setIsEditing] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);





    const handleInputChange = ({ target: { id, value } }) => {
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' })};

    const validateForm = () => {
        const formErrors = {};
        if (!formData.name) formErrors.name = "Required";
        if (!formData.organization) formErrors.organization = "Required";
        if (!formData.email) formErrors.email = !/\S+@\S+\.\S+/.test(formData.email) ? "Invalid Email" : "Required";
        if (!formData.password || formData.password.length < 6) formErrors.password = "Min 6 chars";
        if (!formData.numUsers || isNaN(formData.numUsers) || formData.numUsers <= 0) formErrors.numUsers = "Invalid number";
        if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) formErrors.mobile = "Invalid mobile";
        if (!formData.country) formErrors.country = "Required";
        if (!formData.state) formErrors.state = "Required";
        if (!formData.expireDays || isNaN(formData.expireDays) || formData.expireDays <= 0) formErrors.expireDays = "Invalid days";

        setErrors(formErrors);
        return !Object.keys(formErrors).length;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formPayload = new FormData();
            Object.keys(formData).forEach(key => formPayload.append(key, formData[key]));

            const method = editId ? 'PUT' : 'POST';
            const url = editId ? `/api/users/${editId}` : '/api/users';

            try {
                const response = await fetch(url, {
                    method,
                    body: formPayload,
                });
                if (response.ok) {
                    alert(editId ? "Form updated successfully!" : "Form submitted successfully!");
                    setFormData({ name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: ''});
                    document.getElementById("fil").value = "";
                    setEditId(null);
                    fetchData();
                } else {
                    console.error("Failed to submit form data.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch('http://localhost:5000/countries');
            const data = await response.json();
            setCountries(data);  // Set countries to the state
          } catch (err) { console.error('Error fetching countries:', err);
          }    };    fetchCountries();  }, []);
    
      // Fetch the states based on the selected country
      const fetchStates = async (countryName) => {
        if (!countryName) return; // If no country is selected, don't fetch states
    
        try {
          const response = await fetch(`http://localhost:5000/countries/fetchStateByCountry/${countryName}`);
          const data = await response.json();
          setStates(data);  // Set states to the state
          setError(null);  // Clear any previous errors
        } catch (err) {
          console.error('Error fetching states:', err);
          setError('No states found for the selected country.');
          setStates([])}} // Clear states if there's an error
    
    
      // Handle the country selection change
      const handleCountryChange = (event) => {
        const countryName = event.target.value;
        setSelectedCountry(countryName);
        fetchStates(countryName);  // Fetch states when country is selected
      };
    

    

    const handleEdit = (id) => {
        const user = displayList.find(user => user.id === id);
        setFormData(user);
        setEditId(id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    alert("User deleted successfully");
                    fetchData();
                } else {
                    console.error("Failed to delete user.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };
    return (
        <div className="bg-gray-100 flex flex-col items-center">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold mb-5">Registered Users (Router)</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <NavLink to="/country" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                        Add Country
                    </NavLink>
                    <NavLink to="/state" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                        Add Country
                    </NavLink>
                </div>
            </div>
    
            <div className="flex flex-col space-y-4 w-full max-w-4xl mx-auto p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Fields go here (e.g., name, organization, email, etc.) */}
                        <div className="flex flex-col">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="organization">Organization</label>
                            <input
                                id="organization"
                                type="text"
                                value={formData.organization}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.organization && <span className="text-red-500 text-sm">{errors.organization}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="numUsers">Number of Users</label>
                            <input
                                id="numUsers"
                                type="number"
                                value={formData.numUsers}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.numUsers && <span className="text-red-500 text-sm">{errors.numUsers}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                id="mobile"
                                type="text"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
                        </div>
                        
                        <div>
                                <label>Select Country: </label>
                                <select onChange={handleCountryChange} value={selectedCountry}>
                                <option value="">Select a Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.country_name}>
                                    {country.country_name}
                                    </option>
                                ))}
                                </select>
                            </div>

                            {/* State Dropdown */}
                            {selectedCountry && (
                                <div>
                                <label>Select State: </label>
                                <select>
                                    <option value="">Select a State</option>
                                    {states.length > 0 ? (
                                    states.map((state, index) => (
                                        <option key={index} value={state.state_name}>
                                        {state.state_name}
                                        </option>
                                    ))
                                    ) : (
                                    <option>No states available</option>
                                    )}
                                </select>
                                </div>
                            )}

                            {/* Display error message if any */}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                        <div className="flex flex-col">
                            <label htmlFor="expireDays">Expire Days</label>
                            <input
                                id="expireDays"
                                type="number"
                                value={formData.expireDays}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.expireDays && <span className="text-red-500 text-sm">{errors.expireDays}</span>}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fil">Upload Photo</label>
                            <input
                                id="fil"
                                type="file"
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                        </div>
                    </div>
                    <button type="submit" className="border border-green-200 text-black bg-purple-500 m-3 p-3 rounded-md w-full">
                        {isEditing ? "Update" : "Submit"}
                    </button>

                </form>
            </div>
    
            <h2 className="text-black text-center text-3xl mb-4">User Details</h2>
            <RegisterTable />

        </div>
    )}