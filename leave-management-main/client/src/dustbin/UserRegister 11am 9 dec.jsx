import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserRegisterUI from './UserRegisterUI';
import { useNavigate } from 'react-router-dom';

const UserRegisterScript = () => {
  const [formData, setFormData] = useState({
    name: 'TVK',
    email: 'x@gamil.com',
    role_id: '1',
    user_id: '123',
    role_name: 'Admin',
    password: '1',
    profile_picture: null,
  });
  const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/add_user', {
      state: { formData },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profile_picture) {
      setAlertMessage({ message: 'Please upload a profile picture.', type: 'error' });
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:5000/add_user', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAlertMessage({ message: 'User registered successfully!', type: 'success' });
      fetchUsers();
    } catch (error) {
      setAlertMessage({
        message: error.response?.data?.error || 'Error registering user.',
        type: 'error',
      });
    } finally {
      setTimeout(() => setAlertMessage({ message: '', type: '' }), 3000);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/add_user');
      setUsers(response.data.result);
    } catch (error) {
      setError('Error fetching users');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserRegisterUI
      formData={formData}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      users={users}
      alertMessage={alertMessage}
      handleNavigate={handleNavigate}
    />
  );
};

export default UserRegisterScript;
