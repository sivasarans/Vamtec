import React, { useState, useEffect } from 'react';
// import { useEditId } from './components/Register'

const RegisterTable = ({ setFormData, setEditId }) => {
  const [registerData, setRegisterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your API or database
    fetch('http://localhost:5000/countries/register') // Update with your actual data URL
      .then(response => response.json())
      .then(data => {
        setRegisterData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching register data:', error);
        setLoading(false);
      });
  }, []);

  // const handleEdit = (id) => {
  //   // Implement your edit functionality here
  //   console.log('Editing user with ID:', id);
  // };

  // const { editId, setEditId } = useEditId();

  // const handleEdit = (user) => {
  //   setFormData({organization: user.organization, name: user.name, email: user.email, password: user.password,mobile:user.mobile, num_users: user.num_users, country: user.country_name, state: user.state_name, expiry_date: user.expires_date})
  //   setEditId(user.id);
  // };
  const handleEdit = (user) => {
    setFormData({
      organization: user.organization,
      name: user.name,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      num_users: user.num_users,
      country: user.country_name,
      state: user.state_name,
      expiry_date: user.expires_date,
    });
    setEditId(user.id);
  };

  // const handleDelete = (id) => {
  //   // Implement your delete functionality here
  //   console.log('Deleting user with ID:', id);
  // };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/register/${id}`, { method: 'DELETE' });
      if (response.ok) {
            console.log('Deleting user with ID:', id);

        // fetchStates();
        alert("register deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting register:", error);
    }
  };

  return (
    <div>
      <h2>Register Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Organization</th>
              <th className="border px-4 py-2">Photo</th>
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
                <td className="border px-4 py-2">{user.id || 'N/A'}</td>
                <td className="border px-4 py-2">{user.organization || 'N/A'}</td>
                <td className="border px-4 py-2">
                  {user.photo ? (
                    <img
                      src={URL.createObjectURL(user.photo)} // Assuming the photo is in binary format
                      alt="User Photo"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    'No Photo'
                  )}
                </td>
                <td className="border px-4 py-2">{user.name || 'N/A'}</td>
                <td className="border px-4 py-2">{user.mobile || 'N/A'}</td>
                <td className="border px-4 py-2">{user.email || 'N/A'}</td>
                <td className="border px-4 py-2">{user.password || 'N/A'}</td>
                <td className="border px-4 py-2">{user.num_users || 'N/A'}</td>
                <td className="border px-4 py-2">{user.state_name || 'N/A'}</td>
                <td className="border px-4 py-2">{user.country_name || 'N/A'}</td>
                <td className="border px-4 py-2">{user.expiry_date || 'N/A'}</td>
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
  );
};

export default RegisterTable;
