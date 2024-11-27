import React, { useState, useEffect } from 'react';

const Register = () => {
  const [countries, setCountries] = useState([]);  // To store the list of countries
  const [selectedCountry, setSelectedCountry] = useState('');  // To store selected country
  const [states, setStates] = useState([]);  // To store states based on selected country
  const [error, setError] = useState(null);

  // Fetch the list of countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:5000/countries');
        const data = await response.json();
        setCountries(data);  // Set countries to the state
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch the states based on the selected country
  const fetchStates = async (countryName) => {
    if (!countryName) return; // If no country is selected, don't fetch states

    try {
      const response = await fetch(`http://localhost:5000/countries/fetchStateByCountry/${countryName}`);
      const data = await response.json();
      setStates(data);  // Set states to the state
      setError(null);  // Clear any previous errors
    } catch (err) {
      console.error('Error fetching states:', err);
      setError('No states found for the selected country.');
      setStates([]);  // Clear states if there's an error
    }
  };

  // Handle the country selection change
  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);
    fetchStates(countryName);  // Fetch states when country is selected
  };

  return (
    <div>
      <h1>Register</h1>

      {/* Country Dropdown */}
      <div>
        <label>Select Country: </label>
        <select onChange={handleCountryChange} value={selectedCountry}>
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.country_name}>
              {country.country_name}
            </option>
          ))}
        </select>
      </div>

      {/* State Dropdown */}
      {selectedCountry && (
        <div>
          <label>Select State: </label>
          <select>
            <option value="">Select a State</option>
            {states.length > 0 ? (
              states.map((state, index) => (
                <option key={index} value={state.state_name}>
                  {state.state_name}
                </option>
              ))
            ) : (
              <option>No states available</option>
            )}
          </select>
        </div>
      )}

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
