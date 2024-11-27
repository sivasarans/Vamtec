import React, { useState, useEffect } from "react";
import { useNavigate , NavLink} from 'react-router-dom';

function Country() {
  // const navigate = useNavigate();
  const [formdata, setformdata] = useState({ countryCode: '', countryName: '' });
  const [errors, setErrors] = useState({});
  const [displaydata, setdisplaydata] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformdata({ ...formdata, [id]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formdata.countryCode) {
      formErrors.countryCode = "Country Code is required.";
    } else if (formdata.countryCode.length !== 2) {
      formErrors.countryCode = "Country Code should be exactly 2 characters.";
    }

    if (!formdata.countryName) {
      formErrors.countryName = "Country Name is required.";
    } else if (formdata.countryName.length < 3) {
      formErrors.countryName = "Country Name should be at least 3 characters.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (!editId) {
          // Add new entry
          const response = await fetch('http://localhost:5000/countries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata)
          });

          if (response.ok) {
            alert("Country added successfully!");
            fetchCountries();
            setformdata({ countryCode: '', countryName: '' });
          } else {
            alert("Failed to add country. Please try again.");
          }
        } else {
          // Update existing entry
          const response = await fetch(`http://localhost:5000/countries/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formdata)
          });

          if (response.ok) {
            alert("Country updated successfully!");
            fetchCountries();
            setformdata({ countryCode: '', countryName: '' });
            setEditId(null);
          } else {
            alert("Failed to update country. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:5000/countries');
      const data = await response.json();
      setdisplaydata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/countries/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert("Country deleted successfully!");
        fetchCountries();
      } else {
        alert("Failed to delete country. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (country) => {
    setformdata({ countryCode: country.country_code, countryName: country.country_name });
    setEditId(country.id);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">        
    
      <div className="bg-white p-6 rounded shadow-md w-96">
<NavLink to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Back
</NavLink>

        <h2 className="text-2xl font-bold mb-4">Country Management</h2>
        <form id="countryForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
              Country Code
            </label>
            <input
              type="text"
              id="countryCode"
              value={formdata.countryCode}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.countryCode && (
              <p className="text-red-500 text-sm">{errors.countryCode}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="countryName" className="block text-sm font-medium text-gray-700">
              Country Name
            </label>
            <input
              type="text"
              id="countryName"
              value={formdata.countryName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.countryName && (
              <p className="text-red-500 text-sm">{errors.countryName}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            {editId ? "Update Country" : "Add Country"}
          </button>
        </form>

        <h2 className="text-xl font-bold mt-6 mb-4">Countries List</h2>
        <button onClick={fetchCountries} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Load Countries</button>
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b text-left">ID</th>
              <th className="py-2 px-2 border-b text-left">Country Code</th>
              <th className="py-2 px-2 border-b text-left">Country Name</th>
              <th className="py-2 px-2 border-b text-left">Edit</th>
              <th className="py-2 px-2 border-b text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {displaydata.map((value, ind) => (
              <tr key={ind}>
                <td>{value.id}</td>
                <td>{value.country_code}</td>
                <td>{value.country_name}</td>
                <td>
                  <button onClick={() => handleEdit(value)} className="text-blue-500">Edit</button>
                </td>
                <td>
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

export default Country;
