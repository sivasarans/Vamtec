import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, addCountry, updateCountry, deleteCountry } from "../redux/countriesSlice";
import { NavLink } from "react-router-dom";
const Country = () => {
  const dispatch = useDispatch();
  const { data: countries, loading } = useSelector((state) => state.countries);
console.log("countries:",countries);
  const [formdata, setFormdata] = useState({ countryCode: "", countryName: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.id]: "" })); // Clear error on input change
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formdata.countryCode || formdata.countryCode.length !== 2) formErrors.countryCode = "Country Code should be 2 characters.";
    if (!formdata.countryName || formdata.countryName.length < 3) formErrors.countryName = "Country Name should be at least 3 characters.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      editId ? dispatch(updateCountry({ id: editId, data: formdata })) : dispatch(addCountry(formdata));
      setFormdata({ countryCode: "", countryName: "" });
      setEditId(null);
    }
  };
  
  const handleEdit = (country) => {
    setFormdata({ countryCode: country.country_code, countryName: country.country_name });
    setEditId(country.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteCountry(id));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
      <NavLink to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                        Back
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-2 border-b text-left">ID</th>
                <th className="py-2 px-2 border-b text-left">Code</th>
                <th className="py-2 px-2 border-b text-left">Name</th>
                <th className="py-2 px-2 border-b text-left">Edit</th>
                <th className="py-2 px-2 border-b text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.id}>
                  <td>{country.id}</td>
                  <td>{country.country_code}</td>
                  <td>{country.country_name}</td>
                  <td>
                    <button onClick={() => handleEdit(country)} className="text-blue-500">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(country.id)} className="text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Country;
