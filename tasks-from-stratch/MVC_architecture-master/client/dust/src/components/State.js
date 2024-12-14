// App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addState, deleteState, setStates } from "../redux/stateSlice";
import { NavLink } from "react-router-dom";
import {
  fetchCountries,
  fetchStates,
  addState as addStateAPI,
  updateState as updateStateAPI,
  deleteState as deleteStateAPI,
} from "../services/stateService"; // Import axios functions

function App() {
  const [formData, setFormData] = useState({ country: "", stateName: "" });
  const [errors, setErrors] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [editId, setEditId] = useState(null);

  const states = useSelector((state) => state.states.states);
  const dispatch = useDispatch();
  console.log("states:",states);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countries = await fetchCountries();
        setCountryList(countries);
        // console.log("countries:",countries);
        // console.log("countryList:", countryList);
        const states = await fetchStates();
        dispatch(setStates(states)); // Set states in Redux store
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const url = editId ? `states/${editId}` : "states";
      const stateData = {
        country_name: formData.country,
        state_name: formData.stateName,
      };

      try {
        let response;
        if (editId) {
          response = await updateStateAPI(editId, stateData);
          // Update existing state in Redux store
          dispatch(
            setStates(
              states.map((state) =>
                state.id === editId
                  ? {
                      ...state,
                      country_name: formData.country,
                      state_name: formData.stateName,
                    }
                  : state
              )
            )
          );
          alert("State updated successfully!");
        } else {
          response = await addStateAPI(stateData);
          // Add the new state to Redux store
          dispatch(addState(response));
          alert("State added successfully!");
        }

        fetchStates(); // Fetch the states to update the list
        setFormData({ country: "", stateName: "" });
        setEditId(null); // Clear the edit ID after submission
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStateAPI(id);
      dispatch(deleteState(id)); // Remove state from Redux store
      alert("State deleted successfully");
    } catch (error) {
      alert("Error deleting state:", error);
    }
  };

  const handleEdit = (state) => {
    setFormData({ country: state.country_name, stateName: state.state_name });
    setEditId(state.id);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">

      <div className="bg-white p-6 rounded shadow-md w-96">
      <NavLink to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                        Back
                    </NavLink>
        <h2 className="text-2xl font-bold mb-4">
          {editId ? "Update" : "Add"} State
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Select Country
            </label>
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
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="stateName"
              className="block text-sm font-medium text-gray-700"
            >
              State Name
            </label>
            <input
              type="text"
              id="stateName"
              value={formData.stateName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.stateName && (
              <p className="text-red-500 text-sm">{errors.stateName}</p>
            )}
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
            {states.map((state) => (
              <tr key={state.id}>
                <td>{state.id}</td>
                <td>{state.country_name}</td>
                <td>{state.state_name}</td>
                <td>
                  <button
                    onClick={() => handleEdit(state)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(state.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
