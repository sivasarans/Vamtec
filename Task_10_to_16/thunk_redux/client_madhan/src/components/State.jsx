import React,{useState , useCallback , useMemo,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchStates, addState,deleteState,updateState } from "../store/redux/stateSlice";
import { fetchCountries } from "../store/redux/countrySlice";
const State =  () => {

  const dispatch = useDispatch();
  const { items : countries } = useSelector((state) => state.countries);
  const { statelist, loading, error } = useSelector((state) => state.states);
  console.log(statelist) ;
    const [ state, setstate] =useState({
      id : "",  
      country_id : "",
      state_name : ""
      });
      const [submit , setSubmit] =useState(false);
    
      useEffect(() => {
        dispatch(fetchStates());
        dispatch(fetchCountries());
    }, [dispatch,state]);


console.log(statelist);


      const getValue = useCallback((event) => {
        const {name, value } = event.target;
        setstate((prev) => ({...prev, [name]: value }));
        // console.log("Updated state:", { [name]: value }); 
      },[]);
    
      const validateForm = () => {
        if (!state.country_id) {
          alert("Country Name must be  chosen");
          return false;
        }else if (!state.state_name) {
          alert("State Name is must be filled up ");
          return false;
        }else{
          return true;
        }
      };
    
      const editState = useCallback((statelist) => {
        setstate({
          id : statelist.id,
          country_id : statelist.country_id,
          state_name : statelist.state_name
        });
        setSubmit(true);
      },[setstate,setSubmit]);

      const submitForm = useCallback((event) => {
        event.preventDefault();
        if (validateForm()) {
          if(submit){
            dispatch(updateState(state));
            alert("Updated Successfully");
          }else{
            dispatch(addState(state));
            alert("Added Successfully");
          }
          setSubmit(false);
          setstate({id :"", country_id:"",state_name:""});
        }
      });


      const display = useMemo(() => (
        statelist.map((statelist, index) => {
          const country = countries.find((countryList) => countryList.id == statelist.country_id);
          return (
          <tr key={index}>
             <td className="border-2 border-gray-300 px-4 py-2">{statelist.id}</td>
                <td className="border-2 border-gray-300 px-4 py-2">{country ? country.country_name : "Unknown Country"}</td>
                <td className="border-2 border-gray-300 px-4 py-2">{statelist.state_name}</td>
                <td className="border-2 border-gray-300 px-4 py-2"><button className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onClick={() =>(editState(statelist))}  >Edit</button></td>
                <td className="border-2 border-gray-300 px-4 py-2"><button className="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onClick={() => {dispatch(deleteState(statelist.id))}} >Delete</button></td>
          </tr>
          );
        })
      ), [statelist]);
    
    
    
        return (
            <><div className="flex justify-center items-center min-h-screen bg-gray-200">
                <div className="flex-1 " >
        <div className="bg-gray-100 border-4 border-blue-800 w-96 p-5 rounded-md flex flex-col h-auto max-h-[450px] m-5 md:max-w-[375px]">
        <h1 className="text-blue-800 text-center text-3xl mb-4">State</h1>
          <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="country"> Country   : </label>
          <div className="flex-2">
            <select name="country_id" id="country" value={state.country_id} onChange={getValue} className="w-full p-1 border border-gray-300 rounded" >
              <option value="">Select Country</option>
              {countries.map((countrylist, index) => (
                <option value={countrylist.id}>{countrylist.country_name}</option>)
              )}
             
            </select>
          </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="state"> State   : </label>
            <div className="flex-2">
              <input type="text" id="state" name="state_name" placeholder="State Name" className="w-full p-1 border border-gray-300 rounded" value={state.state_name} onChange={getValue} />
            </div>
            </div>
    
        <div id="btn" className="flex items-center mb-2">
        <button onClick={submitForm} className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >{submit ? <>Update State </>: <>Add State</> }</button>
        </div>
      </div>
      </div>
    <div className="flex-auto mr-2 text-center">
      <NavLink to={'/'}><button  className="text-white bg-green-500 w-1/4 m-1 py-2 text-lg rounded hover:bg-green-700"  >Register User</button></NavLink>
      <NavLink to={'/country'}><button  className="text-white bg-green-500 w-1/4 m-1 py-2 text-lg rounded hover:bg-green-700"  >Add Country</button></NavLink>
      <NavLink to={'/state'}><button  className="text-white bg-green-500 w-1/4 m-1 py-2 text-lg rounded hover:bg-green-700"  >Add State</button></NavLink>
      <h2 className="text-blue-800 text-center text-3xl mb-4">State List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table className="table-auto border border-gray-300 bg-gray-100 w-full" id="state_list">
        <thead>
      <tr>
          <th className="border-2 border-gray-300 px-4 py-2">ID</th>
          <th className="border-2 border-gray-300 px-4 py-2">Country</th>
          <th className="border-2 border-gray-300 px-4 py-2">State</th>
          <th className="border-2 border-gray-300 px-4 py-2">Edit</th>
          <th className="border-2 border-gray-300 px-4 py-2">Delete</th>
        </tr>
        </thead>
        <tbody>
        { display }
        </tbody>
      </table>
      
    </div>
    </div></>
        )
}

export default State;