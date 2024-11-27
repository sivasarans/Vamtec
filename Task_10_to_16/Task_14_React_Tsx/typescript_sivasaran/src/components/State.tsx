import React, { useState, ChangeEvent, FormEvent } from "react";
import { NavLink } from 'react-router-dom';

interface FormData {
    country: string;
    stateName: string;
}

interface FormErrors {
    country?: string;
    stateName?: string;
}

const State: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ country: '', stateName: '' });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' });
    };

    const validateForm = (): boolean => {
        const formErrors: FormErrors = {};
        if (!formData.country) formErrors.country = "Please select a country.";
        if (!formData.stateName || formData.stateName.length < 3) {
            formErrors.stateName = "State name should be at least 3 characters.";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Validated:", formData);
            setFormData({ country: '', stateName: '' });
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <NavLink to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Back</NavLink>

                <h2 className="text-2xl font-bold mb-4">Add/Update State</h2>
                <form id="stateForm" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Select Country</label>
                        <select
                            id="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Choose a country</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stateName" className="block text-sm font-medium text-gray-700">State Name</label>
                        <input
                            type="text"
                            id="stateName"
                            value={formData.stateName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.stateName && <p className="text-red-500 text-sm">{errors.stateName}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                        Add State
                    </button>
                </form>
            </div>
        </div>
    );
}

export default State;
