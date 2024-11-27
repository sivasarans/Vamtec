import React, { useState, ChangeEvent, FormEvent } from "react";
import { NavLink } from 'react-router-dom';

interface FormData {
    name: string;
    organization: string;
    email: string;
    password: string;
    numUsers: string;
    mobile: string;
    country: string;
    state: string;
    expireDays: string;
    photo: File | null;
}

interface FormErrors {
    name?: string;
    organization?: string;
    email?: string;
    password?: string;
    numUsers?: string;
    mobile?: string;
    country?: string;
    state?: string;
    expireDays?: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: '', photo: null
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, files } = e.target as HTMLInputElement;
        setFormData({ ...formData, [id]: files ? files[0] : value });
        setErrors({ ...errors, [id]: '' });
    };

    const validateForm = (): boolean => {
        const formErrors: FormErrors = {};
        if (!formData.name) formErrors.name = "Name is required.";
        if (!formData.organization) formErrors.organization = "Organization is required.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "A valid email is required.";
        if (!formData.password || formData.password.length < 6) formErrors.password = "Password must be at least 6 characters.";
        if (!formData.numUsers || isNaN(Number(formData.numUsers)) || Number(formData.numUsers) <= 0) formErrors.numUsers = "Number of users must be a positive number.";
        if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) formErrors.mobile = "Mobile number must be a 10-digit number.";
        if (!formData.country) formErrors.country = "Country selection is required.";
        if (!formData.state) formErrors.state = "State selection is required.";
        if (!formData.expireDays || isNaN(Number(formData.expireDays)) || Number(formData.expireDays) <= 0) formErrors.expireDays = "Expire days must be a positive number.";

        setErrors(formErrors);
        return !Object.keys(formErrors).length;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Form validated!");
            setFormData({ name: '', organization: '', email: '', password: '', numUsers: '', mobile: '', country: '', state: '', expireDays: '', photo: null });
            const fileInput = document.getElementById("fil") as HTMLInputElement;
            if (fileInput) fileInput.value = "";
        }
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold mb-5">Registered Users (Router)</h1>
                <div className="flex justify-center gap-4 flex-wrap">
                    <NavLink to="/country" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Add Country</NavLink>
                    <NavLink to="/state" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4">Add State</NavLink>
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
                                <option value="">Choose Country</option>
                                <option value="Country-1">Country-1</option>
                                <option value="Country-2">Country-2</option>
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
                            <button type="submit" className="border border-green-200 text-black bg-purple-500 m-3 p-3 rounded-md w-full">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <h2 className="text-black text-center text-3xl mb-4">User Details</h2>
        </div>
            
    );
};

export default Register;


