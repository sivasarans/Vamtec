import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: 'John', email: 'johndoe@example.com', role_id: '1',
    user_id: 'johndoe123', role_name: 'Admin', password: 'password123', profile_picture: null
  });
  const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, profile_picture: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.profile_picture) return setAlertMessage({ message: 'Upload a profile picture.', type: 'error' });

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataToSubmit.append(key, value));

    try {
      await axios.post('http://localhost:5000/add_user', formDataToSubmit, { headers: { 'Content-Type': 'multipart/form-data' } });
      setAlertMessage({ message: 'User registered successfully!', type: 'success' });
      fetchUsers();
    } catch (error) {
      setAlertMessage({ message: error.response?.data?.error || 'Error registering user.', type: 'error' });
    } finally {
      setTimeout(() => setAlertMessage({ message: '', type: '' }), 3000);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/add_user');
      setUsers(res.data.result);
    } catch {
      console.error('Error fetching users');
    }
  };

  useEffect(() => fetchUsers(), []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      {alertMessage.message && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md w-80 text-center 
        ${alertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {alertMessage.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {['name', 'email', 'role_id', 'user_id', 'password'].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-lg font-medium text-gray-700">{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type={field === 'password' ? 'password' : field === 'role_id' ? 'number' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        <div className="flex flex-col">
          <label htmlFor="role_name" className="text-lg font-medium text-gray-700">Role</label>
          <select
            id="role_name"
            name="role_name"
            value={formData.role_name}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {['Admin', 'Manager', 'HR Manager', 'Employee'].map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
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
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Register</button>
        </div>
      </form>
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {['Profile Picture', 'Name', 'Email', 'Role ID', 'User ID', 'Role', 'Password', 'Actions'].map((header) => (
                <th key={header} className="border border-gray-300 p-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user) => (
              <tr key={user.user_id}>
                <td><img src={`http://localhost:5000${user.profile_picture}`} alt="Profile" width="50" height="50" /></td>
                {['name', 'email', 'role_id', 'user_id', 'role_name'].map((field) => (
                  <td key={field} className="border border-gray-300 p-2">{user[field]}</td>
                ))}
                <td className="border border-gray-300 p-2">{user.password.slice(0, 10)}...</td>
                <td className="border border-gray-300 p-2">
                  <button className="mr-2">Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="text-center p-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRegister;
