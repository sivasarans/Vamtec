import { useCallback, useEffect, useState } from "react";
import { dbx } from '../App';  // Import dbx from App.js
import { NavLink, useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({ name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: '',photo:null });
    const [errors, setErrors] = useState({});
    const [displayList, setDisplayList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Track if in edit mode FOR BUTTON "UPDATE TEXT"

    const handleInputChange = ({ target: { id, value, files } }) => {
        if (id === 'fil' && files && files.length > 0) {// Set photo directly from file input
            setFormData({ ...formData, photo: files[0] });// Store the uploaded file in `formData.photo`
        } else {
            setFormData({ ...formData, [id]: value });//eg: if input name means, triggering name id and value eg: name: "xxx" is saved
        }
        setErrors({ ...errors, [id]: '' });
    console.log("Checking render in HandleInputChange")}


    const validateForm = () => {
        console.log("Checking Validation....")
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

        setErrors(formErrors);console.log("errors",errors);
        return !Object.keys(formErrors).length;//! , length 0 (F)= T, ! 2 = F
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("formData", formData);
    
            
            if (editId !== null) { // If editId is set, update the existing entry
                setIsEditing(false) // CHANGE TO BUTTON TEXT "AFTER SUMBIT TO ADD"
                const updateRequest = dbx.transaction("register", "readwrite").objectStore("register").put({ ...formData, id: editId });
                updateRequest.onsuccess = () => {
                    alert("Form updated successfully!");
                    setEditId(null); // Reset editId after update
                    setFormData({
                        name: '', organization: '', email: '', password: '', numUsers: '', mobile: '',
                        country: '', state: '', expireDays: '', photo: null
                    });
                    document.getElementById("fil").value = "";
                    fetchData();
                };
                updateRequest.onerror = (e) => {
                    console.error("Error updating data:", e.target.error);
                };}
            else if (dbx) {// Check if dbx is initialized 
                // const formKey = Date.now(); // Using 'Date.now()' as the key (or use a custom field)
                // Add formData to the objectStore, using formKey as the key
                const done = dbx.transaction("register", "readwrite").objectStore("register").add(formData); // First param is data, second param is key
    
                done.onsuccess = () => {
                    alert("Form ADDED submitted!");
                    console.log("Form submitted: ", formData);
                    setFormData({
                        name: '', organization: '', email: '', password: '', numUsers: '', mobile: '',
                        country: '', state: '', expireDays: '',photo: null
                    });
                    document.getElementById("fil").value = "";
                    fetchData();
                };
    
                done.onerror = (e) => {
                    console.log("Error:", e.target.error);
                };
            } else {
                console.log("Database not initialized yet.");
            }
        }
    };

    const fetchData = () => {
        if (dbx) {
            const transaction = dbx.transaction("register", "readonly");
            const store = transaction.objectStore("register");
            const request = store.getAll();

            request.onsuccess = (e) => {
                setDisplayList(e.target.result);
                console.log("fetdata Success");
            };

            request.onerror = (e) => {
                console.error("Error fetching data:", e.target.error);
            };
        }
    };
    useEffect(() => {
        if (dbx) fetchData(); // Only call fetchData if dbx is initialized
    }, []);


    const handleDelete = (id) => { 
        if (!id){console.log("Delete ID: " + id);}
        if (dbx) {const what_del=dbx.transaction("register","readwrite").objectStore("register").delete(id);
        what_del.onsuccess = (e) => {fetchData(e.target.result);};
        what_del.onerror = (e) => {console.error("Error deleting data:", e.target.error);};}}

    
        const handleEdit = (id) => {
            if (dbx) {
                setIsEditing(true);

                const store = dbx.transaction("register", "readwrite").objectStore("register");
                const request = store.get(id);
    
                request.onsuccess = (e) => {
                    const data = e.target.result;
                    setFormData({ ...data });
                    setEditId(id); // Set editId to indicate that we're editing
                };
                request.onerror = (e) => {
                    console.error("Error retrieving data for editing:", e.target.error);
                };
            }
        };

    return (
        
        <div className="bg-gray-100 flex flex-col items-center">


            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold mb-5">Registered Users (Router)</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                <NavLink to="/country" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                Add Country </NavLink> 
                <button onClick={() => { navigate('/state') }} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4">Add State</button>
                </div>
            </div>

            <div className="flex flex-col space-y-4 w-full max-w-4xl mx-auto p-4">
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
                            <option value="">Choose Country</option><option value="Country-1">Country-1</option><option value="Country-2">Country-2</option>
                                {/* Populate country options dynamically if available */}
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
                                <option value="State-1">State-1</option>
                                <option value="State-2">State-2</option>
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
                            <button type="button" onClick={fetchData} className="border border-grey-200 text-black bg-green-500 m-3 p-3 rounded-md w-full">Load Records</button>

                        </div>
                    </div>
                </form>
            </div>
            <h2 className="text-black text-center text-3xl mb-4">User Details</h2>
            <table className="table-auto border border-gray-200 bg-white w-full">
    <thead>
    <tr>
                        <th className="border-2 border-green-300 px-4 py-2">Organization</th>
                        <th className="border-2 border-green-300 px-4 py-2">Photo</th>
                        <th className="border-2 border-green-300 px-4 py-2">Name</th>
                        <th className="border-2 border-green-300 px-4 py-2">Mobile No</th>
                        <th className="border-2 border-green-300 px-4 py-2">Email</th>
                        <th className="border-2 border-green-300 px-4 py-2">No of Users</th>
                        <th className="border-2 border-green-300 px-4 py-2">State</th>
                        <th className="border-2 border-green-300 px-4 py-2">Country</th>
                        <th className="border-2 border-green-300 px-4 py-2">Expire Date</th>
                        <th className="border-2 border-green-300 px-4 py-2">Edit</th>
                        <th className="border-2 border-green-300 px-4 py-2">Delete</th>
                    </tr>
    </thead>
    <tbody>
    {displayList.map((user, index) => (
        <tr key={index}>
            <td className="border-2 border-green-300 px-4 py-2">{user.organization || "N/A"}</td>
            <td className="border-2 border-green-300 px-4 py-2"> {user.photo ? (
                    <img src={URL.createObjectURL(user.photo)} alt="User Photo" className="w-12 h-12 rounded-full" /> ) 
                    : ( "No Photo" )}
            </td>            <td className="border-2 border-green-300 px-4 py-2">{user.name || "N/A"}</td>
            <td className="border-2 border-green-300 px-4 py-2">{user.mobile || "N/A"}</td>
            <td className="border-2 border-green-300 px-4 py-2">{user.email || "N/A"}</td>
            <td className="border-2 border-green-300 px-4 py-2">{user.numUsers || "N/A"}</td>
            <td className="border-2 border-green-300 px-4 py-2">{user.state || "N/A"}</td>
            <td className="border-2 border-green-300 px-4 py-2">{user.country || "N/A"}</td>
            <td className="border-2 border-green-300 px-4 py-2">{user.expireDays || "N/A"}</td>
            <td onClick={() => handleEdit(user.id)} className="border-2 border-green-300 px-4 py-2"><button>Edit</button></td>
            <td onClick={() => handleDelete(user.id)} className="border-2 border-green-300 px-4 py-2"><button>Delete</button></td>
        </tr>
    ))}
</tbody>

  </table>
        </div>
    );
}

export default Register;
