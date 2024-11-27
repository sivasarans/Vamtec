import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', organization: '', email: '', password: '', numUsers: '',
        mobile: '', country: '', state: '', expireDays: '', photo: null
    });
    const [errors, setErrors] = useState({});
    const [displayList, setDisplayList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [registerData, setRegisterData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInputChange = ({ target: { id, value, files } }) => {
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' });
    };

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
    
    useEffect(() => {
      fetch('http://localhost:5000/register')
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Log data to verify it's coming through
          setRegisterData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);
  
    useEffect(() => {
      // Fetch countries on component mount
      fetch('http://localhost:5000/register/countries')
        .then(response => response.json())
        .then(data => setCountries(data))
        .catch(error => console.error('Error fetching countries:', error));
    }, []);
  
    useEffect(() => {
      if (selectedCountry) {
        // Fetch states based on selected country
        fetch(`http://localhost:5000/register/states/${selectedCountry}`)
          .then(response => response.json())
          .then(data => setStates(data))
          .catch(error => console.error('Error fetching states:', error));
      }
    }, [selectedCountry]);
  
    const handleEdit = (id) => {
        console.log('Editing user with id:', id);
        setEditId(id);
        setIsEditing(true);
        const userToEdit = registerData.find(user => user.id === id);
        setFormData(userToEdit);
    };
    
    const handleDelete = (id) => {
        console.log('Deleting user with id:', id);
        fetch(`http://localhost:5000/register/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setRegisterData(prevData => prevData.filter(user => user.id !== id));
        })
        .catch(error => console.error('Error deleting user:', error));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const userData = { ...formData };
        let url = 'http://localhost:5000/register';
        let method = 'POST';

        if (isEditing) {
            url = `http://localhost:5000/register/${editId}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const updatedUserData = await response.json();
                if (isEditing) {
                    setRegisterData(prevData => 
                        prevData.map(user => (user.id === editId ? updatedUserData : user))
                    );
                } else {
                    setRegisterData(prevData => [...prevData, updatedUserData]);
                }
                setIsEditing(false);
                setFormData({
                    name: '', organization: '', email: '', password: '', numUsers: '',
                    mobile: '', country: '', state: '', expireDays: '', photo: null
                });
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
      <div>
          <h2>Register</h2>
          <div className="text-center mb-5">
              <h1 className="text-3xl font-bold mb-5">Registered Users (Router)</h1>
              <div className="flex justify-center gap-4 flex-wrap">
                  <NavLink to="/country" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">
                      Add Country
                  </NavLink>
                  <button onClick={() => { navigate('/state') }} className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-4">
                      Add State
                  </button>
              </div>
          </div>
  
          <div className="flex flex-col space-y-4 w-full max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Fields for Name, Organization, Email, Password, etc. */}
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
  
                  {/* <div>
                      <label>Country: </label>
                      <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
                          <option value="">Select a Country</option>
                          {countries.map((country, index) => (
                              <option key={index} value={country.country_name}>
                                  {country.country_name}
                              </option>
                          ))}
                      </select>
                  </div>
  
                  {selectedCountry && (
                      <div>
                          <label>State: </label>
                          <select>
                              <option value="">Select a State</option>
                              {states.map((state, index) => (
                                  <option key={index} value={state.state_name}>
                                      {state.state_name}
                                  </option>
                              ))}
                          </select>
                      </div> */}


<div>
  <label>Country: </label>
  <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
    <option value="">Select a Country</option>
    {countries.map((country, index) => (
      <option key={index} value={country.country_name}>{country.country_name}</option>
    ))}
  </select>
</div>

{selectedCountry && (
  <div>
    <label>State: </label>
    <select>
      <option value="">Select a State</option>
      {states.map((state, index) => (
        <option key={index} value={state.state_name}>{state.state_name}</option>
      ))}
    </select>
  </div>
                  )}
                  <div className="flex flex-col">
                      <label htmlFor="expireDays">Expire Days</label>
                      <input
                          id="expireDays"
                          type="number"
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
  
              <h2>Register Data</h2>
              {loading ? (
                  <p>Loading...</p>
              ) : (
                  <table className="table-auto border-collapse w-full">
                      <thead>
                          <tr>
                              <th className="border px-4 py-2">ID</th>
                              <th className="border px-4 py-2">Organization</th>
                              <th className="border px-4 py-2">Name</th>
                              <th className="border px-4 py-2">Mobile</th>
                              <th className="border px-4 py-2">Email</th>
                              <th className="border px-4 py-2">Password</th>
                              <th className="border px-4 py-2">Num Users</th>
                              <th className="border px-4 py-2">State</th>
                              <th className="border px-4 py-2">Country</th>
                              <th className="border px-4 py-2">Expiry Date</th>
                              <th className="border px-4 py-2">Edit</th>
                              <th className="border px-4 py-2">Delete</th>
                          </tr>
                      </thead>
                      <tbody>
                          {registerData.map((user, index) => (
                              <tr key={index}>
                                  <td className="border px-4 py-2">{user.id || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.organization || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.name || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.mobile || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.email || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.password || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.num_users || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.state_name || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.country_name || "N/A"}</td>
                                  <td className="border px-4 py-2">{user.expiry_date || "N/A"}</td>
                                  <td className="border px-4 py-2">
                                      <button onClick={() => handleEdit(user.id)}>Edit</button>
                                  </td>
                                  <td className="border px-4 py-2">
                                      <button onClick={() => handleDelete(user.id)}>Delete</button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          </div>
      </div>
  );
  
  
}

export default Register;
