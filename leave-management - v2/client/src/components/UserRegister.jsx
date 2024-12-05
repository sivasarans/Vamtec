import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role_id: '',
    user_id: '',
    role_name: '',
    password: '',
    profile_picture: null
  });

  const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/add_user', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setAlertMessage({ message: 'User registered successfully!', type: 'success' });
      setTimeout(() => setAlertMessage({ message: '', type: '' }), 3000); // Hide alert after 3 seconds
      console.log(response.data);
    } catch (error) {
      setAlertMessage({ message: 'Error registering user. Please try again.', type: 'error' });
      setTimeout(() => setAlertMessage({ message: '', type: '' }), 3000);
      console.error(error.response.data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      {alertMessage.message && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md w-80 text-center ${
            alertMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {alertMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="role_id" className="text-lg font-medium text-gray-700">Role ID</label>
          <input
            type="number"
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="user_id" className="text-lg font-medium text-gray-700">User ID</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
        <label htmlFor="role_name" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role_name"
          name="role_name"
          value={formData.role_name}
          onChange={handleChange}
          className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="profile_picture" className="text-lg font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            id="profile_picture"
            name="profile_picture"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>

        </div>
        <div>
  <p className="text-red-500 font-bold">* User Id Must be Unique</p>
  <p className="text-blue-500 font-bold">* Role Id ( 1 to 4 ) 1. Admin 2.Manager 3.Hr Manager 4.Employee</p>
  <p className="text-green-500 font-bold">* Role Name Must be in (1. Admin 2.Manager 3.Hr Manager 4.Employee)</p>
</div>

      </form>
    </div>
  );
};

export default UserRegister;
