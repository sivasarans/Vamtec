import React, { useState, useEffect } from 'react';

const Register = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]); // Default to an empty array
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try { const response = await fetch('http://localhost:5000/countries');
                const data = await response.json();
                setCountries(data);
            } catch (err) { console.error('Error fetching countries:', err);
            } }; fetchCountries(); }, []);
    

    return (
        <div>
            <h1>Select Country</h1>
            <div>
                <label>Country: </label>
                <select value={selectedCountry} >
                    <option value="">Select a Country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.country_name}>
                            {country.country_name}
                        </option>
                    ))}
                </select>
                </div>
                </div>


    );
};

export default Register;
