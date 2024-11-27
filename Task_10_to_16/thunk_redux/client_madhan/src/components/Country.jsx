import React, { useState ,useMemo, useCallback ,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries,addCountry,deleteCountry,updateCountry } from "../store/redux/countrySlice";

const Country = () => {

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.countries);  
  const [country , setcountry] =useState({ id:0, country  : "" });
    const [submit , setSubmit] =useState(false);
  
    const getValue = useCallback((event) => {
      const {value} = event.target;
      setcountry((prev) => ({...prev, country : value}));
    },[]);

    const editCountry = useCallback((country_list) => {
      setcountry({
        id : country_list.id,
        country : country_list.country_name
      });
      setSubmit(true);
    },[setcountry,setSubmit]);
  
    const validateForm = () => {
      if (!country.country) {
        alert("Country Name is required");
        return false;
      }else{
        // alert("Registered successfully!");
        return true;
      }
    };
    useEffect(() => {
      dispatch(fetchCountries());
  }, [dispatch,country]);
  
    const submitForm = useCallback((event) => {
      event.preventDefault();
      if (validateForm()) {
        if(submit){
          dispatch(updateCountry(country));
          setcountry({ id:'' , country:''});
        setSubmit(false);
        }else{
          dispatch(addCountry(country));
          setcountry({country:''});
        setSubmit(false);
        }
        
      }
    },[dispatch,validateForm,country,submit]);


    const display = useMemo(() => (
      items.map((countryList,index) => (
        <tr key={index} >
          <td className="border-2 border-gray-300 px-4 py-2">{countryList.id }</td>
          <td className="border-2 border-gray-300 px-4 py-2">{countryList.country_name}</td>
          <td className="border-2 border-gray-300 px-4 py-2">
            <button className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" 
            onClick={() => editCountry(countryList)}>Edit</button>
          </td>
          <td className="border-2 border-gray-300 px-4 py-2">
            <button className="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" 
            onClick={() => dispatch(deleteCountry(countryList.id))}>Delete</button>
          </td>
        </tr>
      ))
    ), [items,dispatch,editCountry]);
  
      return (
         <> 
    <div className="flex justify-center items-center min-h-screen  bg-gray-200">
         <div className="flex-1 " >
    <div className="bg-gray-100 border-4 border-blue-800 w-96 p-5 rounded-md flex flex-col h-auto max-h-[450px] m-5 md:max-w-[375px]">
      <h1 className="text-blue-800 text-center text-3xl mb-4">Country</h1>
      <div className="flex items-center mb-2">
      <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="country">Country Name :</label>
      <div className="flex-2">
      <input type="text" id="country" name="country" placeholder="Country Name" className="w-full p-1 border border-gray-300 rounded" value={country.country} onChange={getValue}  />
      </div>
      </div>
  
      <div id="btn" className="flex items-center mb-2">
      <button onClick={submitForm} className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700"  >{submit ? <>Update Country</> : <>Add Country</> }</button>
      </div>
    </div>
    </div>
  <div className="flex-auto mr-2 text-center">
    <NavLink to={'/'}><button  className="text-white bg-green-500 w-1/4 py-2 m-1 text-lg rounded hover:bg-green-700"  >Register User</button></NavLink>
    <NavLink to={'/country'}><button  className="text-white bg-green-500 w-1/4 py-2 m-1 text-lg rounded hover:bg-green-700"  >Add Country</button></NavLink>
    <NavLink to={'/state'}><button  className="text-white bg-green-500 w-1/4 py-2 m-1 text-lg rounded hover:bg-green-700"  >Add State</button></NavLink>
  
    <h2 className="text-blue-800 text-center text-3xl mb-4">Country List</h2>
    {loading && <p>Loading ... </p>}
    <table className="table-auto border border-gray-300 bg-gray-100 w-full" id="country_list">
      <thead>
    <tr>
        <th className="border-2 border-gray-300 px-4 py-2">ID</th>
        <th className="border-2 border-gray-300 px-4 py-2">Country</th>
        <th className="border-2 border-gray-300 px-4 py-2">Edit</th>
        <th className="border-2 border-gray-300 px-4 py-2">Delete</th>
      </tr>
      </thead>
      <tbody>
      {display }
      </tbody>
    </table>
  </div>
  </div></>
      );
}

export default Country;