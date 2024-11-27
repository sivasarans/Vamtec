import { useCallback, useEffect, useState } from "react";
import { dbx } from '../App';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: '', photo: null });
    const [errors, setErrors] = useState({});
    const [fetchCountryState, setFetchCountryState] = useState([]); // Country and state data
    const [stateList, setStateList] = useState([]); // States for the selected country
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Editing state

    const handleInputChange = ({ target: { id, value, files } }) => {
        if (id === 'fil' && files && files.length > 0) {
            setFormData({ ...formData, photo: files[0] });
        } else {
            setFormData({ ...formData, [id]: value });
        }
        setErrors({ ...errors, [id]: '' });
    };

    const validateForm = () => {
        const formErrors = {};
        if (!formData.name) formErrors.name = "Required";
        if (!formData.organization) formErrors.organization = "Required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Invalid Email";
        if (!formData.password || formData.password.length < 6) formErrors.password = "Min 6 chars";
        if (!formData.numUsers || isNaN(formData.numUsers) || formData.numUsers <= 0) formErrors.numUsers = "Invalid number";
        if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) formErrors.mobile = "Invalid mobile";
        if (!formData.country) formErrors.country = "Required";
        if (!formData.state) formErrors.state = "Required";
        if (!formData.expireDays || isNaN(formData.expireDays) || formData.expireDays <= 0) formErrors.expireDays = "Invalid days";

        setErrors(formErrors);
        return !Object.keys(formErrors).length;
    };

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFormData({ ...formData, country: selectedCountry, state: '' });
        const selectedCountryData = fetchCountryState.find(item => item.countryName === selectedCountry);
        if (selectedCountryData) {
            setStateList(selectedCountryData.states); 
        } else {
            setStateList([]);
        }
    };

    const fetchCountryAndState = () => {
        const request = indexedDB.open('your_database', 1);
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('state', 'readonly');
            const objectStore = transaction.objectStore('state');
            const fetchRequest = objectStore.getAll();
            fetchRequest.onsuccess = (e) => {
                setFetchCountryState(e.target.result);
            };
        };
    };

    useEffect(() => {
        fetchCountryAndState(); // Fetch country and state data when the component mounts
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (editId !== null) {
                const updateRequest = dbx.transaction("register", "readwrite").objectStore("register").put({ ...formData, id: editId });
                updateRequest.onsuccess = () => {
                    alert("Form updated successfully!");
                    setEditId(null);
                    resetForm();
                };
                updateRequest.onerror = (e) => {
                    console.error("Error updating data:", e.target.error);
                };
            } else if (dbx) {
                const done = dbx.transaction("register", "readwrite").objectStore("register").add(formData);
                done.onsuccess = () => {
                    alert("Form added successfully!");
                    resetForm();
                };
                done.onerror = (e) => {
                    console.log("Error:", e.target.error);
                };
            } else {
                console.log("Database not initialized yet.");
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: '', photo: null });
        fetchData();
    };

    const fetchData = () => {
        if (dbx) {
            const transaction = dbx.transaction("register", "readonly");
            const store = transaction.objectStore("register");
            const request = store.getAll();

            request.onsuccess = (e) => {
                console.log("Fetched data", e.target.result);
            };

            request.onerror = (e) => {
                console.error("Error fetching data:", e.target.error);
            };
        }
    };

    const handleDelete = (id) => {
        if (dbx) {
            const deleteRequest = dbx.transaction("register", "readwrite").objectStore("register").delete(id);
            deleteRequest.onsuccess = () => {
                fetchData();
            };
            deleteRequest.onerror = (e) => {
                console.error("Error deleting data:", e.target.error);
            };
        }
    };

    const handleEdit = (id) => {
        if (dbx) {
            setIsEditing(true);
            const store = dbx.transaction("register", "readwrite").objectStore("register");
            const request = store.get(id);

            request.onsuccess = (e) => {
                const data = e.target.result;
                setFormData({ ...data });
                setEditId(id);
            };
            request.onerror = (e) => {
                console.error("Error retrieving data for editing:", e.target.error);
            };
        }
    };

    <div className="bg-gray-100 flex flex-col items-center">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold mb-5">Registered Users (Router)</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={() => { navigate('/country') }} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Add Country</button>
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
                            <select id="country" value={formData.country} onChange={handleCountryChange} className="mt-1 block w-full p-2 border border-green-200 rounded-md">
                                <option value="">Select Country</option>
                                {fetchCountryState.map((country) => (
                                    <option key={country.countryName} value={country.countryName}>
                                        {country.countryName}
                                    </option>
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
                                {stateList.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>

                        <div>
                            <label htmlFor="fil" className="block mt-2">Photo</label>
                            <input type="file" id="fil" onChange={handleInputChange} className="mt-1 block w-full p-2 border border-green-200 rounded-md" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    
}

export default Register;