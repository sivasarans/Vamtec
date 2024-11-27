import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { dbx } from '../App';  // Ensure `dbx` is properly initialized in App.js

function Country() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({ countryCode: '', countryName: '' });
  const [errors, setErrors] = useState({});
  const [displaydata, setdisplaydata] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformdata({ ...formdata, [id]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" })); // Reset error for specific input
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!editId) {
        // Add new entry
        if (dbx) {
          const countryAdd = dbx.transaction("country", "readwrite").objectStore("country").add(formdata);
          countryAdd.onsuccess = () => {
            alert("Country added successfully!");
            console.log("Country added:", formdata);
            fetch(); // Refresh data
            setformdata({ countryCode: '', countryName: '' }); // Clear form
          };
          countryAdd.onerror = (event) => {
            console.error("Error adding country:", event.target.error);
            alert("Failed to add country. Please try again.");
          };
        } else {
          console.log("dbx error (not initialized)");
        }
      } else {
        // Update existing entry
        if (dbx) {
          const transaction = dbx.transaction("country", "readwrite");
          const store = transaction.objectStore("country");
          const request = store.put({ ...formdata, id: editId });

          request.onsuccess = () => {
            alert("Country updated successfully!");
            console.log("Country updated:", formdata);
            fetch(); // Refresh data
            setformdata({ countryCode: '', countryName: '' });
            setEditId(null); // Reset edit ID after update
          };
          request.onerror = (event) => {
            console.error("Error updating country:", event.target.error);
            alert("Failed to update country. Please try again.");
          };
        } else {
          console.log("dbx error (not initialized)");
        }
      }
    }
  };

  const fetch = () => {
    if (dbx) {
      const transaction = dbx.transaction("country", "readonly");
      const store = transaction.objectStore("country");
      const request = store.getAll();

      request.onsuccess = (e) => {
        setdisplaydata(e.target.result);
        console.log("Data fetched successfully!");
      };
      request.onerror = (e) => {
        console.error("Error fetching data:", e.target.error);
      };
    } else {
      console.log("dbx error (not initialized)");
    }
  };

  const handleDelete = (id) => {
    if (dbx) {
      const transaction = dbx.transaction("country", "readwrite");
      const store = transaction.objectStore("country");
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log("Country deleted successfully!");
        fetch(); // Refresh data
      };
      request.onerror = (e) => {
        console.error("Error deleting data:", e.target.error);
      };
    } else {
      console.log("dbx error (not initialized)");
    }
  };

  const handleEdit = (id) => {
    if (dbx) {
      const transaction = dbx.transaction("country", "readwrite");
      const store = transaction.objectStore("country");
      const request = store.get(id);

      request.onsuccess = (e) => {
        const data = e.target.result;
        if (data) {
          setformdata({ ...data });
          setEditId(id); // Set edit ID to indicate editing mode
        }
      };
      request.onerror = (e) => {
        console.error("Error retrieving data for editing:", e.target.error);
      };
    } else {
      console.log("dbx error (not initialized)");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <button
          onClick={() => navigate('/')}
          type="button"
          className="rounded border-gray-300 bg-gray-500 text-white p-2 mb-4"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold mb-4">Country Select</h2>
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
        <button onClick={fetch} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Load Countries</button>
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
                <td>{value.countryCode}</td>
                <td>{value.countryName}</td>
                <td>
                  <button onClick={() => handleEdit(value.id)} className="text-blue-500">Edit</button>
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
