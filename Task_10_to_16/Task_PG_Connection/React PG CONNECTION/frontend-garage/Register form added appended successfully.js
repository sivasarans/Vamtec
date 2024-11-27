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
    const [error, setError] = useState(null);

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
        if (!formData.expireDays || (isNaN(Date.parse(formData.expireDays)))) formErrors.expireDays = "Invalid days";

        setErrors(formErrors);
        return !Object.keys(formErrors).length;
    };

  // const handleSubmit = async (e) => {
  //   console.log(formData);
  //     e.preventDefault();
  //     if (validateForm()) {
  //         const method = editId ? 'PUT' : 'POST';
  //         const url = editId ? `/register/${editId}` : '/register';
  
  //         try {
  //             const response = await fetch(url, {
  //                 method,
  //                 headers: { 'Content-Type': 'application/json' },
  //                 body: JSON.stringify(formData),
  //             });
  //             if (response.ok) {
  //                 alert(editId ? 'User updated successfully!' : 'User added successfully!');
  //                 setFormData({ name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: '' });
  //                 setEditId(null);
  //                 fetchUsers(); // Reload users after update
  //             } else {
  //                 console.error('Failed to submit form data.');
  //             }
  //         } catch (err) {
  //             console.error('Error:', err);
  //         }
  //     }
  // };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const response = await fetch('http://localhost:5000/register1', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData), // Replace formData with your state
//         });

//         if (!response.ok) {
//             throw new Error('Failed to submit form data.');
//         }

//         const result = await response.json();
//         console.log(result);
//     } catch (err) {
//         console.error(err.message);
//     }
// };


// const handleSubmit = async (e) => {
//   e.preventDefault(); // Prevent default form submission behavior

//   // Log the current form data (for debugging purposes)
//   console.log('Form data submitted:', formData);

//   if (validateForm()) {
//       // Determine HTTP method and URL based on edit mode
//       const method = editId ? 'PUT' : 'POST';
//       const url = editId ? `/register/${editId}` : '/register';

//       try {
//           // Send the form data to the server
//           const response = await fetch(url, {
//               method,
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(formData),
//           });

//           // Handle the server response
//           if (response.ok) {
//               const successMessage = editId ? 'User updated successfully!' : 'User added successfully!';
//               alert(successMessage);

//               // Reset form data after successful submission
//               setFormData({
//                   name: '',
//                   organization: '',
//                   email: '',
//                   password: '',
//                   numUsers: '',
//                   mobile: '',
//                   country: '',
//                   state: '',
//                   expireDays: '',
//               });

//               setEditId(null); // Exit edit mode if applicable
//               fetchUsers(); // Reload the user list
//           } else {
//               console.error('Failed to submit form data. Response status:', response.status);
//               alert('Error submitting data. Please try again.');
//           }
//       } catch (err) {
//           console.error('Error submitting form:', err);
//           alert('An unexpected error occurred. Please try again.');
//       }
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
      const method = editId ? 'PUT' : 'POST';
      const url = editId 
          ? `http://localhost:5000/register/${editId}` 
          : 'http://localhost:5000/register'; // Correct backend endpoint

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
                  numUsers: '',
                  mobile: '',
                  country: '',
                  state: '',
                  expireDays: '',
              });
              setEditId(null);
              fetchUsers(); // Reload user list
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

  const fetchUsers = async () => {
      try {
          const response = await fetch('/register');
          const data = await response.json();
          // setUsers(data); // Populate the table
      } catch (err) {
          console.error('Error fetching users:', err);
      }
  };
  
  // const handleDelete = async (id) => {
  //     if (window.confirm('Are you sure you want to delete this user?')) {
  //         try {
  //             const response = await fetch(`/register/${id}`, { method: 'DELETE' });
  //             if (response.ok) {
  //                 alert('User deleted successfully');
  //             } else {
  //                 console.error('Failed to delete user.');
  //             }
  //         } catch (err) {
  //             console.error('Error:', err);}}};

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
      const handleCountryChange = (event) => {
        const countryName = event.target.value;
        setSelectedCountry(countryName);
        setFormData((prevFormData) => ({
          ...prevFormData,
          country: countryName, // Update country in formData
      }));
        fetchStates(countryName);  // Fetch states when country is selected
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
                                <select id="country" onChange={handleCountryChange}
                                //  value={selectedCountry} 
                                value={formData.country}

                                 className="border p-2"                                >
                                <option value="">Select a Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.country_name}>
                                    {country.country_name}
                                    </option>
                                ))}
                                </select>
                                {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}

                            </div>

                                <div>
                                <label>Select State: </label>
                                <select id="state" 
                                 value={formData.state}
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
                                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}

                                </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                        <div className="flex flex-col">
                            <label htmlFor="expireDays">Expire Days</label>
                            <input
                                id="expireDays"
                                type="date"
                                value={formData.expireDays}
                                onChange={handleInputChange}
                                className="border p-2"
                            />
                            {errors.expireDays && <span className="text-red-500 text-sm">{errors.expireDays}</span>}
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
    export default Register;