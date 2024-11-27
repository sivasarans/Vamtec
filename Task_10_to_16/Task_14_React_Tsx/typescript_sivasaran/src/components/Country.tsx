import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

interface FormData {
  countryCode: string;
  countryName: string;
}

interface FormErrors {
  countryCode?: string;
  countryName?: string;
}

const Country: React.FC = () => {
  const [formdata, setFormdata] = useState<FormData>({ countryCode: '', countryName: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormdata({ ...formdata, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validateForm = () => {
    const formErrors: FormErrors = {};
    if (formdata.countryCode.length !== 2) formErrors.countryCode = "Code must be 2 chars.";
    if (formdata.countryName.length < 3) formErrors.countryName = "Name must be 3+ chars.";
    setErrors(formErrors);
    return !Object.keys(formErrors).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Country added successfully!");
      setFormdata({ countryCode: '', countryName: '' });
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <NavLink to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Back</NavLink>
        <h2 className="text-2xl font-bold mb-4">Country Select</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">Country Code</label>
            <input type="text" id="countryCode" value={formdata.countryCode} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="countryName" className="block text-sm font-medium text-gray-700">Country Name</label>
            <input type="text" id="countryName" value={formdata.countryName} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            {errors.countryName && <p className="text-red-500 text-sm">{errors.countryName}</p>}
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
            Add Country
          </button>
        </form>
      </div>
    </div>
  );
};

export default Country;
