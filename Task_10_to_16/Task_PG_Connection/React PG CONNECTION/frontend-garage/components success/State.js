import React, { useState, useEffect  } from "react";
import { useNavigate , NavLink} from 'react-router-dom';


function State() {
  const [formData, setFormData] = useState({ country: '', stateName: '' });
  const [errors, setErrors] = useState({});
  const [displayData, setDisplayData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCountries();
    fetchStates();
  }, []);

  // Fetch list of countries
  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:5000/countries");
      const data = await response.json();
      setCountryList(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  // Fetch list of states
  const fetchStates = async () => {
    try {
      const response = await fetch("http://localhost:5000/states");
      const data = await response.json();
      setDisplayData(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  // Validate form data
  const validateForm = () => {
    const formErrors = {};
    if (!formData.country) {
      formErrors.country = "Please select a country.";
    }
    if (!formData.stateName) {
      formErrors.stateName = "State name is required.";
    } else if (formData.stateName.length < 3) {
      formErrors.stateName = "State name should be at least 3 characters.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission (adding or updating state)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const url = editId ? `http://localhost:5000/states/${editId}` : 'http://localhost:5000/states';
      const method = editId ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            country_name: formData.country,
            state_name: formData.stateName
          }),
        });

        if (response.ok) {
          alert(editId ? "State updated successfully!" : "State added successfully!");
          fetchStates();
          setFormData({ country: '', stateName: '' });
          setEditId(null);
        } else {
          const errorData = await response.json();
          alert(`Failed: ${errorData.error || "Please try again."}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // Handle deleting state
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/states/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchStates();
        alert("State deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting state:", error);
    }
  };

  // Handle editing state
  const handleEdit = (state) => {
    setFormData({ country: state.country_name, stateName: state.state_name });
    setEditId(state.id);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
      <NavLink to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Back
      </NavLink>
        <h2 className="text-2xl font-bold mb-4">{editId ? "Update" : "Add"} State</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Select Country</label>
            <select
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Choose a country</option>
              {countryList.map((country) => (
                <option key={country.id} value={country.country_name}>
                  {country.country_name}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="stateName" className="block text-sm font-medium text-gray-700">State Name</label>
            <input
              type="text"
              id="stateName"
              value={formData.stateName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.stateName && <p className="text-red-500 text-sm">{errors.stateName}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            {editId ? "Update State" : "Add State"}
          </button>
        </form>

        <h2 className="text-xl font-bold mt-6 mb-4">States List</h2>
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-2 border-b text-left">ID</th>
              <th className="py-2 px-2 border-b text-left">Country Name</th>
              <th className="py-2 px-2 border-b text-left">State Name</th>
              <th className="py-2 px-2 border-b text-left">Edit</th>
              <th className="py-2 px-2 border-b text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((state) => (
              <tr key={state.id}>
                <td>{state.id}</td>
                <td>{state.country_name}</td>
                <td>{state.state_name}</td>
                <td>
                  <button onClick={() => handleEdit(state)} className="text-blue-500">Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(state.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default State;
