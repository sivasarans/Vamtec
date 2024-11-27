import React, { useState , useContext} from "react";
import { Change } from "./Page";
// import { useNavigate } from 'react-router-dom';


function Country() {
  // const navigate = useNavigate();
  const {show,setshow} = useContext(Change);



  const [countryCode, setCountryCode] = useState("");// initail "" we can use "2"
  const [countryName, setCountryName] = useState("");
  const [errors, setErrors] = useState({});

  const fun = (e) => {
    const { id, value } = e.target;//This is destructuring. It's extracting the id and value properties from e.target.
    //e.target is <input type="text" id="ccode" class="mt-1 block w-full p-2 border border-gray-300 rounded" value="1">
    //id is (e.g., "ccode" or "cname")
    //value is whaterver the user type in input field
    if (id === "ccode") setCountryCode(value); 
    if (id === "cname") setCountryName(value); 
    setErrors((xxx) => ({ ...xxx, [id]: "" }));// Reset error for the input being changed
    //xxx is parameters for dict, set id is ""
    //...xxx is a spread operator for dict
  };

  const validateForm = () => {
    const formErrors = {};
    if (!countryCode) formErrors.countryCode = "Country Code is required.";
    else if (countryCode.length !== 2) formErrors.countryCode = "Country Code should be exactly 2 characters.";
    if (!countryName) formErrors.countryName = "Country Name is required.";
    else if (countryName.length < 3) formErrors.countryName = "Country Name should be at least 3 characters.";
    setErrors(formErrors);console.log("errors",errors)// eg: {countryCode: 'Country Code is required.', countryName: 'Country Name is required.'}
    return Object.keys(formErrors).length === 0;//eg: checking formErrors has no key/value in dict
    //we cant directly use keys(formErrors).length === 0, for ===comparing, need syntax: Object.keys(formErrors).length === 0
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) { alert("Country added/updated successfully!");
      setCountryCode("");// Clear the form
      setCountryName("");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <button  onClick={() => { setshow("Register")       }}          type="button"          className="rounded border-gray-300 bg-gray-500 text-white p-2 mb-4"        >          Back        </button>
        <h2 className="text-2xl font-bold mb-4">Country Select</h2>
        <form id="countryForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label              htmlFor="ccode"              className="block text-sm font-medium text-gray-700"            >              Country Code            </label>
            <input type="text" id="ccode" value={countryCode} onChange={fun} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            {errors.countryCode && (              <p className="text-red-500 text-sm">{errors.countryCode}</p>            )}
          </div>
          <div className="mb-4">
            <label              htmlFor="cname"              className="block text-sm font-medium text-gray-700"            >              Country Name            </label>
            <input              type="text"
              id="cname"              value={countryName}              onChange={fun}              className="mt-1 block w-full p-2 border border-gray-300 rounded"            />
            {errors.countryName && (              <p className="text-red-500 text-sm">{errors.countryName}</p>            )}
          </div>
          <button            type="submit"            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"          >            Add/Update Country          </button>
        </form>

        <h2 className="text-xl font-bold mt-6 mb-4">Countries List</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 border-b text-left">Default ID</th>
              <th className="py-2 border-b text-left">Country Code</th>
              <th className="py-2 border-b text-left">Country Name</th>
              <th className="py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody id="countryTableBody"></tbody>
        </table>
      </div>
    </div>
  );
}

export default Country;
