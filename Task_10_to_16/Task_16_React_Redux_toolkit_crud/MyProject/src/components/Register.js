import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask, editTask, deleteTask, loadTasks } from "../redux/registerSlice";

function Register() {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: '', photo: null
    });
    const [errors, setErrors] = useState({});
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const statess = useSelector((state) => state.state.tasks); // Access states
    console.log("All States: ", statess); // Log the entire statess array

    const filteredStates = statess.filter((state) => state.country === formData.country);
    console.log("Form Country: ", formData.country); // Debug the country value
    console.log("Filtered States: ", filteredStates); // See what states are filtered

    const countries = useSelector((state) => state.country.tasks); // Access tasks array from countrySlice
    const displayData = useSelector((state) => state.register.tasks); // Fetch tasks from register slice
    const handleInputChange = ({ target: { id, value, files } }) => {
        if (id === 'fil' && files && files.length > 0) { setFormData({ ...formData, photo: files[0] }) } 
        else { setFormData({ ...formData, [id]: value })}
        setErrors({ ...errors, [id]: '' })}

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
        if (!formData.expireDays || isNaN(formData.expireDays) || formData.expireDays <= 0) formErrors.expireDays = "Invalid days";

        setErrors(formErrors);
        return !Object.keys(formErrors).length;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!editId) {dispatch(addTask(formData))} // Add new task
            else { dispatch(editTask({ ...formData, id: editId }))}  // Edit existing task
            setFormData({
                name: '', organization: '', email: '', password: '', numUsers: '', mobile: '',
                country: '', state: '', expireDays: '', photo: null
            }); setEditId(null)}}
    const handleDelete = (id) => { dispatch(deleteTask(id))}
    const handleEdit = (id) => {
        const taskToEdit = displayData.find((task) => task.id === id);
        setFormData(taskToEdit);  // Set form data to the task being edited
        setEditId(id)}  // Set the edit mode to true
    

    return (
        <div className="bg-gray-100 flex flex-col items-center">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold mb-5">Registered Users</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={() => { navigate('/country') }} className="bg-blue-500 text-white py-2 px-4 rounded">Add Country</button>
                    <button onClick={() => { navigate('/state') }} className="bg-green-500 text-white py-2 px-4 rounded">Add State</button>
                </div> </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block mt-2">User Name</label>
                            <input id="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="organization" className="block mt-2">Organization</label>
                            <input id="organization" type="text" value={formData.organization} onChange={handleInputChange} placeholder="Enter your organization" className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                            {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block mt-2">E-mail</label>
                            <input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mt-2">Password</label>
                            <input id="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="numUsers" className="block mt-2">Number of Users</label>
                            <input type="number" id="numUsers" value={formData.numUsers} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                            {errors.numUsers && <p className="text-red-500 text-sm">{errors.numUsers}</p>}
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block mt-2">Mobile Number</label>
                            <input id="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Enter Mobile" className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                        </div>

                        <div>
                            <label htmlFor="country" className="block mt-2">Select Country</label>
                            <select id="country" value={formData.country} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Choose Country</option>
                                {countries.map((country) => (
                                <option key={country.id} value={country.countryName}>
                                    {country.countryName}          </option>
                                ))}
                            </select>
                            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                        </div>

                        <div>
                            <label htmlFor="expireDays" className="block mt-2">Expire Days</label>
                            <input type="number" id="expireDays" value={formData.expireDays} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                            {errors.expireDays && <p className="text-red-500 text-sm">{errors.expireDays}</p>}
                        </div>

                        <div>
                            <label htmlFor="state" className="block mt-2">Select State</label>
                            <select id="state" value={formData.state} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="">Choose State</option>

                            {formData.country && filteredStates.length > 0 ? (
                                filteredStates.map((state) => (
                                    <option key={state.id} value={state.stateName}>
                                        {state.stateName}
                                    </option>
                                ))
                            ) : (
                                <option value="No State Available">No States Available</option> // Add fallback
                            )}
                                {/* Populate state options dynamically if available */}
                            </select>
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>

                        <div>
                <label htmlFor="fil" className="block mt-2">Photo</label>
                <input type="file" id="fil" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
            </div>

                        <div className="col-span-full">
                            <button type="submit" className="border border-green-200 text-black bg-purple-500 m-3 p-3 rounded-md w-full">{isEditing ? "Update" : "Submit"}</button>
                            <button type="button" className="border border-grey-200 text-black bg-green-500 m-3 p-3 rounded-md w-full">Load Records</button>

                        </div>
                    </div>
                </form>
            <h2 className="text-center text-3xl mb-4">User Details</h2>
            <table className="w-full border border-gray-500">
                <thead>
                    <tr>
                    <th className="border border-gray-300 px-4 py-2">Organization</th>
      <th className="border border-gray-300 px-4 py-2">Photo</th>
      <th className="border border-gray-300 px-4 py-2">Name</th>
      <th className="border border-gray-300 px-4 py-2">Mobile No</th>
      <th className="border border-gray-300 px-4 py-2">Email</th>
      <th className="border border-gray-300 px-4 py-2">No of Users</th>
      <th className="border border-gray-300 px-4 py-2">State</th>
      <th className="border border-gray-300 px-4 py-2">Country</th>
      <th className="border border-gray-300 px-4 py-2">Expire Date</th>
      <th className="border border-gray-300 px-4 py-2">Edit</th>
      <th className="border border-gray-300 px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-gray-300 px-4 py-2">{user.organization || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">
          {user.photo ? (
            <img src={URL.createObjectURL(user.photo)} alt="User" className="w-12 h-12 object-cover rounded-full" />
          ) : "No Photo"}
        </td>
        <td className="border border-gray-300 px-4 py-2">{user.name || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">{user.mobile || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">{user.email || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">{user.numUsers || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">{user.state || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">{user.country || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">{user.expireDays || "N/A"}</td>
        <td className="border border-gray-300 px-4 py-2">
          <button onClick={()=>handleEdit(user.id)}>Edit</button>
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <button onClick={()=>handleDelete(user.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Register;
