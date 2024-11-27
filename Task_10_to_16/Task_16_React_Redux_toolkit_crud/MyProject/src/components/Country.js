import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, deleteTask } from "../redux/countrySlice";
import Loginform from "./loginForm";

function Country() {
  const navigate = useNavigate();
  
  const [formdata, setFormdata] = useState({ countryCode: "", countryName: "" });
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.country.tasks); // Get tasks from Redux

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata({ ...formdata, [id]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" })); // Clear error for specific input
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formdata.countryCode || formdata.countryCode.length !== 2) {
      formErrors.countryCode = "Country Code is required and should be exactly 2 characters.";
    }
    if (!formdata.countryName || formdata.countryName.length < 3) {
      formErrors.countryName = "Country Name is required and should be at least 3 characters.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editId !== null) {
        dispatch(editTask({ id: editId, ...formdata })); // Update existing task
        setEditId(null);
      } else {
        const newId =
          tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
        dispatch(addTask({ id: newId, ...formdata }));
      }
      setFormdata({ countryCode: "", countryName: "" }); // Reset form
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setFormdata({ countryCode: taskToEdit.countryCode, countryName: taskToEdit.countryName });
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      {/* <Loginform/> */}
      <div className="bg-white p-6 rounded shadow-md w-96">
        
        <h2 className="text-2xl font-bold mb-4">{editId ? "Edit Country" : "Add Country"}</h2>
        <form onSubmit={handleSubmit}>
        <button
          onClick={() => navigate("/")}
          className="rounded border-gray-300 bg-gray-500 text-white p-2 mb-4"
        >
          Back
        </button>
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
            {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode}</p>}
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
            {errors.countryName && <p className="text-red-500 text-sm">{errors.countryName}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            {editId ? "Update Country" : "Add Country"}
          </button>
        </form>

        <h2 className="text-xl font-bold mt-6 mb-4">Countries List</h2>
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
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.countryCode}</td>
                <td>{task.countryName}</td>
                <td>
                  <button onClick={() => handleEdit(task.id)} className="text-blue-500">
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(task.id)} className="text-red-500">
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

export default Country;
