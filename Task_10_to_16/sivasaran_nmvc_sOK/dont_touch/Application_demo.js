import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [formdata, setformdata] = useState({ name: '', file:null });
  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formdata.name);
    data.append('file', file);

    try {
      const response = await fetch('http://localhost:5555/sample', { method: 'POST', body: data });
      if (response.ok) fetchRecords();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:5555/records');
      setRecords(await response.json());
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={formdata.name} required
            onChange={(e) => setformdata({ name: e.target.value })} />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit">Submit</button>
        </form>

        <h2>Uploaded Records</h2>
        <table border="1">
          <thead>
            <tr><th>Name</th><th>File</th></tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>
                  <img src={`http://localhost:5555/uploads/${record.file_path}`} alt={record.name} style={{ maxWidth: '100px' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
