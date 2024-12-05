import React, { useState } from 'react';

function UserRegister() {
  const [formData, setFormData] = useState({
    name: 'TVK',
    email: 'tvk@gmail.com',
    password: 'tvk',
    role: '1', // Default to Admin role (ID 1)
  });

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send form data to an API or process it as needed
    alert(`User Registered:\nName: ${formData.name}\nEmail: ${formData.email}\nRole ID: ${formData.role}`);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">User Registration</h2>

      {/* Name Input */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Role Dropdown */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="1">Admin</option>
          <option value="2">Manager</option>
          <option value="3">HR Manager</option>
          <option value="4">Employee</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="mb-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default UserRegister;
