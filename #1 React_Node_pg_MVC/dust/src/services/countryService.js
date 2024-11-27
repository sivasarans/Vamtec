// src/services/countryService.js
const API_URL = 'http://localhost:5000/countries';

export const fetchCountriesAPI = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addCountryAPI = async (country) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(country),
  });
  return response.json();
};

export const updateCountryAPI = async (id, country) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(country),
  });
  return response.json();
};

export const deleteCountryAPI = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
