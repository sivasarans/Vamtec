import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import registerService from "../services//registerService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    password: "",
    num_users: "",
    mobile: "",
    country_name: "",
    state_name: "",
    expiry_date: "",
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [registerData, setRegisterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const countriesData = await registerService.getCountries();
        setCountries(countriesData);
        const usersData = await registerService.fetchUsers();
        setRegisterData(usersData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
  }, []);

  const handleCountryChange = async (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country_name: selectedCountry, state_name: "" });

    if (selectedCountry) {
      try {
        const statesData = await registerService.getStatesByCountry(selectedCountry);
        setStates(statesData);
      } catch (err) {
        console.error(err);
      }
    } else {
      setStates([]);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.organization) newErrors.organization = "Organization is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.num_users) newErrors.num_users = "Number of Users is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    if (!formData.country_name) newErrors.country_name = "Country is required";
    if (!formData.state_name) newErrors.state_name = "State is required";
    if (!formData.expiry_date) newErrors.expiry_date = "Expiry date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        await registerService.updateUser(editId, { ...formData, file });
      } else {
        await registerService.createUser({ ...formData, file });
      }
      const usersData = await registerService.fetchUsers();
      setRegisterData(usersData);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditId(user.id);
    setFormData({
      name: user.name,
      organization: user.organization,
      email: user.email,
      password: user.password,
      num_users: user.num_users,
      mobile: user.mobile,
      country_name: user.country_name,
      state_name: user.state_name,
      expiry_date: user.expiry_date,
    });
    setFile(user.file_path);
  };

  const handleDelete = async (id) => {
    try {
      await registerService.deleteUser(id);
      const updatedData = registerData.filter((user) => user.id !== id);
      setRegisterData(updatedData);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      organization: "",
      email: "",
      password: "",
      num_users: "",
      mobile: "",
      country_name: "",
      state_name: "",
      expiry_date: "",
    });
    setFile(null);
    setErrors({});
    setIsEditing(false);
    setEditId(null);
  };

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
                            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
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