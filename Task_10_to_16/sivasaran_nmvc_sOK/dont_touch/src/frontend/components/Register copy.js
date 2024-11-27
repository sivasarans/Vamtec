import { useCallback, useEffect, useState } from "react";
import React from "react";
import { NavLink } from 'react-router-dom';



function Register() {

    const [formData, setFormData] = useState({
        name: '', organization: '', email: '', password: '', num_users: '',
        mobile: '', country_name: '', state_name: '', expiry_date: ''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    const [editId, setEditId] = useState(null);



    const [selectedCountry, setSelectedCountry] = useState('');  // To store selected country_name

    const [isEditing, setIsEditing] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [registerData, setRegisterData] = useState([]);
    const [loading, setLoading] = useState(true);



      
        useEffect(() => {
          // Fetch data from your API or database
          fetch('http://localhost:5000/countries/register') // Update with your actual data URL
            .then(response => response.json())
            .then(data => {
              setRegisterData(data);
              setLoading(false);
            })
            .catch(error => {
              console.error('Error fetching register data:', error);
              setLoading(false);
            });
        }, []);
      
        const handleEdit = async (user) => {
            console.log('Editing user with ID:', user.id);
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
            const response = await fetch(`http://localhost:5000/register/${id}`, { method: 'DELETE' });
            if (response.ok) {
                  console.log('Deleting user with ID:', id);
      
              // fetchStates();
              alert("register deleted successfully");
            }
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
  console.log("Form Data:", formData); // Debugging form data


  if (validateForm()) {
    console.log("Form Data:", formData); // Debugging form data

      const method = editId ? 'PUT' : 'POST';
      const url = editId 
          ? `http://localhost:5000/register/${editId}` 
          : 'http://localhost:5000/register/'; // Correct backend endpoint

      try {
          const response = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
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
              setEditId(null);
            //   fetchUsers(); // Reload user list
          } else {
              console.error('Failed to submit form data. Response status:', response.status);
              alert('Error submitting data. Please try again.');
          }
      } catch (err) {
          console.error('Error submitting form:', err);
          alert('An unexpected error occurred. Please try again.');
      }
  }
};

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch('http://localhost:5000/countries');
            const data = await response.json();
            setCountries(data);  // Set countries to the state_name
          } catch (err) { console.error('Error fetching countries:', err);
          }    };    fetchCountries();  }, []);
    
      // Fetch the state_names based on the selected country_name
      const fetchStates = async (countryName) => {
        if (!countryName) return; // If no country is selected, don't fetch state_names
        try {
          const response = await fetch(`http://localhost:5000/countries/fetchStateByCountry/${countryName}`);
          const data = await response.json();
          setStates(data);  // Set states to the state
          setError(null);  // Clear any previous errors
        } catch (err) {
          console.error('Error fetching states:', err);
          setError('No states found for the selected country.');
          setStates([])}} // Clear states if there's an error
      const handleCountryChange = (event) => {
        // const countryName = event.target.value;
        setSelectedCountry(event.target.value);
        setFormData((prevFormData) => ({
          ...prevFormData,
          country_name: event.target.value, // Update country_name in formData
      }));
        fetchStates(event.target.value);  // Fetch states when country is selected
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
                                {countries.map((x) => (
                                    <option key={x.id} value={x.country_name}>
                                    {x.country_name}
                                    </option>
                                ))}
                                </select>
                                {errors.country_name && <span className="text-red-500 text-sm">{errors.country_name}</span>}

                            </div>

                                <div>
                                <label>Select State: </label>
                                <select id="state_name" 
                                 value={formData.state_name}
                                 onChange={handleInputChange}
                                 className="border p-2">
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
                                {errors.state_name && <span className="text-red-500 text-sm">{errors.state_name}</span>}

                                </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}

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



<h2>Register Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Organization</th>
              <th className="border px-4 py-2">Photo</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Password</th>
              <th className="border px-4 py-2">Num Users</th>
              <th className="border px-4 py-2">State</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">Expiry Date</th>
              <th className="border px-4 py-2">Edit</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {registerData.map((user, index) => (
              <tr key={index}>
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
                    'No Photo'
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
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


        </div>
    )}
    export default Register;