import { useCallback, useEffect, useState } from "react";
import React from "react";
import { NavLink } from 'react-router-dom';
// import '../../tr.css';  // Adjust the relative path based on the actual file structure
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { fetchCountries } from "../redux/countriesSlice";
import {  fetchStates} from "../services/stateService"; 

const Register = () => {
  const { data: countries } = useSelector((state) => state.countries);   console.log("Countries:",countries);
  const states = useSelector((state) => state.states.states);console.log("States( try to reach and back states route):",states);

  // const { data: states} = useSelector((state) => state.states);console.log("States:",states);

  const dispatch = useDispatch();
  

    const [formData, setFormData] = useState({
        name: '', organization: '', email: '', password: '', num_users: '',
        mobile: '', country_name: '', state_name: '', expiry_date: ''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    const [editId, setEditId] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');  // To store selected country_name
    const [isEditing, setIsEditing] = useState(false);
    const [registerData, setRegisterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);

    const fetchRecords = async () => {
      try { const { data } = await axios.get('http://localhost:5000/countries/register'); setRegisterData(data);setLoading(false);console.log("data: " , data)} 
      catch (err) { console.error('Error fetching register data:', err); setLoading(false);}};
    useEffect(() => { fetchRecords(); }, []);
      
        const handleEdit = async (user) => {
            const expiryDate = new Date(user.expiry_date);

    // Extract the day, month, and year in UTC
    const day = String(expiryDate.getUTCDate()).padStart(2, '0');
    const month = String(expiryDate.getUTCMonth() + 1).padStart(2, '0');  // Month is 0-based
    const year = expiryDate.getUTCFullYear();

    // Format the date as yyyy-mm-dd (required by input[type="date"])
    const formattedExpiryDate = `${year}-${month}-${day}`;

    console.log(user.expiry_date);  // "2025-12-30T18:30:00.000Z"
    console.log(formattedExpiryDate);  // "2025-12-30"
        
          await setFormData({
            organization: user.organization,
            name: user.name,
            email: user.email,
            password: user.password,
            mobile: user.mobile,
            num_users: user.num_users,
            country_name: user.country_name,
            state_name: user.state_name,
            expiry_date: formattedExpiryDate,
          });
          setSelectedCountry(user.country_name);

          setEditId(user.id);
        };
        useEffect(() => {
          // Fetch states when country changes (either on page load or edit)
          fetchStates(selectedCountry);
        }, [selectedCountry]); 
      
        const handleDelete = async (id) => {
          try {
            const response = await axios.delete(`http://localhost:5000/register/${id}`);
                  fetchRecords();
                    alert("register deleted successfully");
            
          } catch (error) {
            console.error("Error deleting register:", error);
          }
        };


    const handleInputChange = ({ target: { id, value } }) => {
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' })};

    const validateForm = () => {
        const formErrors = {};
        if (!formData.name) formErrors.name = "Required";
        if (!formData.organization) formErrors.organization = "Required";
        if (!formData.email) formErrors.email = !/\S+@\S+\.\S+/.test(formData.email) ? "Invalid Email" : "Required";
        if (!formData.password || formData.password.length < 6) formErrors.password = "Min 6 chars";
        if (!formData.num_users || isNaN(formData.num_users) || formData.num_users <= 0) formErrors.num_users = "Invalid number";
        if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) formErrors.mobile = "Invalid mobile";
        if (!formData.country_name) formErrors.country_name = "Required";
        if (!formData.state_name) formErrors.state_name = "Required";
        if (!formData.expiry_date || (isNaN(Date.parse(formData.expiry_date)))) formErrors.expiry_date = "Invalid days";

        setErrors(formErrors);
        return !Object.keys(formErrors).length;
    };


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form Data ( before check ):", formData); // Debugging form data


  if (validateForm()) {
    console.log("Form Data ( after valid ):", formData); // Debugging form data
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append the file to FormData
    if (file) {
      data.append('file', file);
    }
      const method = editId ? 'put' : 'post';
      const url = editId 
          ? `http://localhost:5000/register/${editId}` 
          : 'http://localhost:5000/register/';

      try {
          const response = editId 
              ? await axios.put(url, data) // If editing, use PUT
              : await axios.post(url, data); // If creating, use POST


              alert(editId ? 'User updated successfully!' : 'User added successfully!');
              setFormData({
                  name: '',
                  organization: '',
                  email: '',
                  password: '',
                  num_users: '',
                  mobile: '',
                  country_name: '',
                  state_name: '',
                  expiry_date: '',
              });
              fetchRecords();
              setEditId(null);
                        }
       catch (err) {
          console.error('Error submitting form:', err);
          alert('An unexpected error occurred. Please try again.');
      }
  }
};

      const handleCountryChange = (event) => {
        // const countryName = event.target.value;
        setSelectedCountry(event.target.value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          country_name: event.target.value, // Update country_name in formData
          state_name: "", // Reset state_name when country changes

      }));
        fetchStates(event.target.value);  // Fetch states when country is selected
      };

      useEffect(() => {
        if (!countries || countries.length === 0) {
          dispatch(fetchCountries());
          dispatch(fetchStates)
        };
        dispatch(fetchStates)
      }, [dispatch, countries, states]); // Fetch countries only if not already loaded
    
    return (
      <div>
        <div className="bg-gray-100 flex flex-col items-center">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold mb-5">Registered Users (Router)</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <NavLink to="/country" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                        Add Country
                    </NavLink>
                    <NavLink to="/state" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                        Add State
                    </NavLink>
                </div>
            </div>
    
            <div className="flex flex-col space-y-4 w-full max-w-4xl mx-auto p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <label htmlFor="num_users">Number of Users</label>
                            <input
                                id="num_users"
                                type="number"
                                value={formData.num_users}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.num_users && <span className="text-red-500 text-sm">{errors.num_users}</span>}
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
                                <select id="country_name" onChange={handleCountryChange}
                                //  value={selectedCountry} 
                                value={formData.country_name}

                                 className="border p-2"                                >
                                <option value="">Select a Country</option>
                                {Array.isArray(countries) && countries.length > 0 ? (countries.map((x) => (
                                    <option key={x.id} value={x.country_name}>
                                    {x.country_name}
                                    </option>
                                ))):(                <option value="India" >No Country available</option>
                                )}
                                </select>
                                {errors.country_name && <span className="text-red-500 text-sm">{errors.country_name}</span>}

                            </div>

                                <div>
                                <label>Select State: </label>
                                
                                  <select
              id="state_name"
              value={formData.state_name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              
              <option value="">Select a State</option>
              {Array.isArray(states) && states.length > 0 ? (
                states
                  .filter((state) => state.country_name === formData.country_name)
                  .map((state) => (
                    <option key={state.id} value={state.state_name}>
                      {state.state_name}
                    </option>
                  ))
              ) : (
                <option value="Kerala">No states available</option>
              )}
            </select>

                                {errors.state_name && <span className="text-red-500 text-sm">{errors.state_name}</span>}

                                </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="flex flex-col">
                            <label >File Upload</label>



                            <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                        
                                    </div>
                        
                        <div className="flex flex-col">

                            <label htmlFor="expiry_date">Expire Days</label>
                            <input
                                id="expiry_date"
                                type="date"
                                value={formData.expiry_date}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.expiry_date && <span className="text-red-500 text-sm">{errors.expiry_date}</span>}
                        </div>

                    </div>
                    <button type="submit" className="border border-green-200 text-black bg-purple-500 m-3 p-3 rounded-md w-full">
                        {isEditing ? "Update" : "Submit"}
                    </button>

                </form>
            </div>
    
            {/* <h2 className="text-black text-center text-3xl mb-4">User Details</h2>
            <RegisterTable 
  setFormData={setFormData} 
  setEditId={setEditId} 
/> */}

</div>

<h2>Register Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto relative">

        <table className="m-2 p-2 table-auto border-collapse w-full text-sm min-w-max overflow-x-auto relative">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-200">ID</th>
              <th className="border px-4 py-2 bg-gray-200">Organization</th>
              <th className="border px-4 py-2 bg-gray-200">Photo</th>
              <th className="border px-4 py-2 bg-gray-200">Name</th>
              <th className="border px-4 py-2 bg-gray-200">Mobile</th>
              <th className="border px-4 py-2 bg-gray-200">Email</th>
              <th className="border px-4 py-2 bg-gray-200">Password</th>
              <th className="border px-4 py-2 bg-gray-200">Num Users</th>
              <th className="border px-4 py-2 bg-gray-200">State</th>
              <th className="border px-4 py-2 bg-gray-200">Country</th>
              <th className="border px-4 py-2 bg-gray-200">Expiry Date</th>
              <th className="border px-4 py-2 bg-gray-200">Edit</th>
              <th className="border px-4 py-2 bg-gray-200">Delete</th>
            </tr>
          </thead>
          <tbody>
            {registerData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100 even:bg-gray-200">
                <td className="border px-4 py-2">{user.id || 'N/A'}</td>
                <td className="border px-4 py-2">{user.organization || 'N/A'}</td>
                <td className="border px-4 py-2">
                  {user.photo ? (
                    <img
                      src={URL.createObjectURL(user.photo)} // Assuming the photo is in binary format
                      alt="User Photo"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    // 'No Photo'
                    user.file_path
                  )}
                </td>
                <td className="border px-4 py-2">{user.name || 'N/A'}</td>
                <td className="border px-4 py-2">{user.mobile || 'N/A'}</td>
                <td className="border px-4 py-2">{user.email || 'N/A'}</td>
                <td className="border px-4 py-2">{user.password || 'N/A'}</td>
                <td className="border px-4 py-2">{user.num_users || 'N/A'}</td>
                <td className="border px-4 py-2">{user.state_name || 'N/A'}</td>
                <td className="border px-4 py-2">{user.country_name || 'N/A'}</td>
                <td className="border px-4 py-2">{user.expiry_date || 'N/A'}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 hover:underline" onClick={() => handleEdit(user)}>Edit</button>
                </td>
                <td className="border px-4 py-2">
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      )}


</div>
    )}
    export default Register;