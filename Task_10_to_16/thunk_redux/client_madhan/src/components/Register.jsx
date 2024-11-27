import React,{useState, useMemo, useCallback,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {fetchUsers, addUser,deleteUser,updateUser } from "../store/redux/userSlice";
import { fetchStates } from "../store/redux/stateSlice";
import { fetchCountries } from "../store/redux/countrySlice";


const Register = () =>  {

    const dispatch = useDispatch();
    const {userlist , loading , error } = useSelector((state) => state.users);
    const {items :countries} = useSelector((state) => state.countries); 
    const {statelist} = useSelector((state) => state.states);
    const [FormVisible, setFormVisible] = useState(false);
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
    const maxFileSize = 2 * 1024 * 1024;
    const toggleForm = () => {
      setFormVisible(!FormVisible);
    };
    

  
    const [ user, setuser] =useState({
      id : "",
      name : "",
      organization : "",
      mobile_no : "",
      email : "",
      password : "",
      photo  : "",
      change_photo :"",
      no_of_users : "",
      country : "",
      state : "",
      expire_days : "",
      expire_date : ""
    });

    useEffect(() => {
      dispatch(fetchStates());
      dispatch(fetchCountries());
      dispatch(fetchUsers());
      console.log(countries);
      console.log(statelist);

  }, [dispatch,user]);

    const [submit , setSubmit] =useState(false);
    const [country , setcountry] =useState("");
  
    const getValue1 = useCallback((event) => {
      let {name, value } = event.target;
      
      if(name== "country"){
        setcountry(value);
      }else if(name== "expire_days"){
        
        const expireDays = parseInt(value, 10);
        if (!isNaN(expireDays)) {
        const date = new Date(); 
        date.setDate(date.getDate() + expireDays);
        const formatDate = date.toISOString().split('T')[0];
        console.log(expireDays);
        console.log(formatDate);
        name = "expire_date";
        value = formatDate;
        }
      }
      setuser((prev) => ({...prev, [name]: value }));
      console.log(user.expire_date);
    },[]);

    const getValue = useCallback((event) => {
      const { name, value } = event.target;
      setuser((prev) => {
          const updatedUser = { ...prev, [name]: value };
  
          if (name === "country") {
              setcountry(value); 
          } else if (name === "expire_days") {
              const expireDays = parseInt(value, 10);
              if (!isNaN(expireDays)) {
                  const date = new Date();
                  date.setDate(date.getDate() + expireDays);
                  const formatDate = date.toISOString().split('T')[0];
                  updatedUser.expire_date = formatDate;
                  console.log("Expire Date Updated:", formatDate);
              }
          }
  
          return updatedUser;
      });
  }, []);
    const getfile = useCallback((event) => {
      const image = event.target.files[0];
      setuser((prevuser) => ({...prevuser, photo : image }));
  
    },[]);
  
    const validateForm = () => {
      if (!user.name) {
        alert("Name must be  filled out");
        return false;
      }else if (!user.organization) {
        alert(" Organization Name is must be filled out ");
        return false;
      }else if (!user.mobile_no) {
        alert(" Mobile Number is must be filled out ");
        return false;
      }else if (user.mobile_no.length !== 10 ) {
        alert(" Mobile Number must be in 10 digits ");
        return false;
      }else if (!user.email) {
        alert(" Email is must be filled out ");
        return false;
      }else if (!user.password) {
        alert(" Password is must be filled out ");
        return false;
      }else if (user.password.length < 6) {
        alert(" Password should not be less than 6 character ");
        return false;
      // }else if (!user.photo && !user.change_photo) {
      //   alert(" Photo is must be chosen ");
      //   return false;
      // }else if (allowedFileTypes.indexOf(user.photo.type) === -1 && user.photo) {
      //   alert("Photo must be in JPG, JPEG, SVG, or PNG format");
      //   return false;
      // } else if (user.photo.size > maxFileSize && user.photo) {
      //   alert("Photo size must be less than 2 MB");
      //   return false;
      }else if (!user.no_of_users) {
        alert(" Number of users is must be filled out ");
        return false;
      }else if (!user.country) {
        alert(" Country is must be chosen ");
        return false;
      }else if (!user.state) {
        alert(" State is must be chosen ");
        return false;
      }else if (!user.expire_days) {
        alert(" Expire Days is must be filled out ");
        return false;
      }else{
        alert("Registered successfully!");
        return true;
      }
    };
  
    const editUser = useCallback((userlist) => {
      let expireDate = userlist.expire_date.split('T')[0]; 
      let currentDate = new Date();
      currentDate = currentDate.toISOString().split('T')[0]; 
     let expireDateObj = new Date(expireDate);
     let currentDateObj = new Date(currentDate);
     const diffTime =  expireDateObj - currentDateObj;
     const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setuser({
        id : userlist.id,
        name :userlist.username ,
        organization : userlist.organisation,
        mobile_no : userlist.mobile_no,
        email : userlist.email,
        password : userlist.password,
        photo  : "",
        change_photo :"",
        no_of_users : userlist.no_of_users,
        country : userlist.country,
        state : "",
        expire_days : days,
        expire_date :""
      });
      setcountry(userlist.country);
      setuser((prev) => ({...prev , state : userlist.state}));
      setSubmit(true);
      setFormVisible(true);
    })
    const submitForm = useCallback((event) => {
      event.preventDefault();
      if (validateForm()) {
        if(submit){
          dispatch(updateUser(user));
        }else{
          dispatch(addUser(user));
        }
        setSubmit(false);
        document.getElementById("file").value="";
        setFormVisible(false);
        setuser({
          id : "",
          name : "",
          organization : "",
          mobile_no : "",
          email : "",
          password : "",
          photo  : "",
          change_photo :"",
          no_of_users : "",
          country : "",
          state : "",
          expire_days : ""
        });
      }
    },[user,validateForm]);
  
    const display = useMemo(() => (
      userlist.map((userlist, index) => { 
        let expireDate = "";
        if(userlist.expire_date){
         expireDate = userlist.expire_date.split('T')[0];
        }
        const Country = countries.find((countryList) => countryList.id == userlist.country);
        const State = statelist.find((stateList) => stateList.id == userlist.state);
        return (
        <tr key={index}>
              <td className="border-2 border-gray-300 px-4 py-2">{userlist.id}</td>
              <td className="border-2 border-gray-300 px-4 py-2"><img src={userlist.photo} className="w-24 h-24 rounded-full" alt="User Photo" /></td>
              <td className="border-2 border-gray-300 px-4 py-2">{userlist.username} </td>
              <td className="border-2 border-gray-300 px-4 py-2">{userlist.organisation} </td>
              <td className="border-2 border-gray-300 px-4 py-2">{userlist.mobile_no} </td>
              <td className="border-2 border-gray-300 px-4 py-2">{userlist.email} </td>
              <td className="border-2 border-gray-300 px-4 py-2">{userlist.no_of_users} </td>
              <td className="border-2 border-gray-300 px-4 py-2">{State.state_name} </td>
              <td className="border-2 border-gray-300 px-4 py-2">{Country.country_name}</td>
              <td className="border-2 border-gray-300 px-4 py-2">{expireDate}</td>
              <td className="border-2 border-gray-300 px-4 py-2"><button className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onClick={() => {editUser(userlist)}} >Edit</button></td>
              <td className="border-2 border-gray-300 px-4 py-2"><button className="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onClick={() => { dispatch(deleteUser(userlist.id))}} >Delete</button></td></tr>
        )
})
    ), [userlist]);
  
    return (
      <div className="h-full bg-gray-200">
      <div className=" mr-2 p-4 text-center">
    <button onClick={toggleForm} className="text-white bg-green-500 w-1/4 py-2 text-lg m-1 rounded hover:bg-green-700" id="user_btn"  >{FormVisible ? "Close Form" : "Add User"}</button>
    <NavLink to={'/country'}><button  className="text-white bg-green-500 w-1/4 py-2 text-lg m-1 rounded hover:bg-green-700"  >Add Country</button></NavLink>
    <NavLink to={'/state'}><button  className="text-white bg-green-500 w-1/4 py-2 text-lg m-1 rounded hover:bg-green-700"  >Add State</button></NavLink>
    
    { FormVisible && (
    <div id="register_form" className="flex justify-center items-center min-h-screen  " >
      <div className="bg-gray-100 border-4 border-blue-800 w-100 p-5 rounded-md flex flex-col h-auto max-h-[450px] m-5 md:max-w-[375px]">
        <h1 className="text-blue-800 text-center text-3xl mb-4">Registration Form</h1>
        <div className="flex items-center mb-2">
        <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="name">Name :</label>
        <div className="flex-2">
        <input type="text" id="name" name="name" placeholder="Full Name" className="w-full p-1 border border-gray-300 rounded" 
         value={user.name} onChange={getValue} />
        </div>
        </div>
    
        <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="organization">Organization :</label>
          <div className="flex-2">
          <input type="text" id="organization" name="organization" placeholder="Organization Name" className="w-full p-1 border border-gray-300 rounded" 
          value={user.organization} onChange={getValue} />
          </div>
          </div>
    
          <div className="flex items-center mb-2">
            <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="mobile_no">Mobile No : </label>
            <div className="flex-2">
            <input type="number" id="mobile_no" className="w-full p-1 border border-gray-300 rounded" name="mobile_no" placeholder="Mobile No" 
            value={user.mobile_no} onChange={getValue} />
            </div>
            </div>
    
        <div className="flex items-center mb-2">
        <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="email">E-mail : </label>
        <div className="flex-2">
        <input type="email" id="email" className="w-full p-1 border border-gray-300 rounded" name="email" placeholder="Email Address"
         value={user.email} onChange={getValue} />
        </div>
        </div>
        {/* <div id="email_message" style="display: none;">Format : abc123@gmail.com</div> */}
        
    
        <div className="flex items-center mb-2">
        <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="pass">Password  : </label>
        <div className="flex-2">
        <input type="password" id="pass" name="password" className="w-full p-1 border border-gray-300 rounded"
         value={user.password} onChange={getValue} />
        </div>
        </div>
        <div id="pass_message"></div>
  
        <div className="flex items-center mb-4">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="file">Photo : </label>
          <div className="flex-2">
          <input type="file" id="file" name="photo" className="w-4/5 p-1 border border-gray-300 rounded" 
             onChange={getfile} />
          </div>
          </div>
    
        <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="users">Number of Users : </label>
          <div className="flex-2">
          <input type="number" id="users" className="w-full p-1 border border-gray-300 rounded" name="no_of_users" placeholder="No of users"
           value={user.no_of_users} onChange={getValue} />
          </div>
          </div>
    
          <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="country"> Country   : </label>
          <div className="flex-2">
            <select name="country" id="country" value={user.country} onChange={getValue} className="w-full p-1 border border-gray-300 rounded" >
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
              <select name="state" id="state" value={user.state} onChange={getValue} className="w-full p-1 border border-gray-300 rounded" >
              <option value="">Select State</option>
              {country && statelist.filter((statelist) => country == statelist.country_id).map((statelist, index) => (
                <option value={statelist.id}>{statelist.state_name}</option>)
              )}
              </select>
            </div>
            </div>
    
            <div className="flex items-center mb-2">
              <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="expire_days">Expire Days : </label>
              <div className="flex-2">
              <input type="number" id="expire_days" className="w-full p-1 border border-gray-300 rounded" name="expire_days" placeholder="Expire Days" 
               value={user.expire_days} onChange={getValue} />
              </div>
              </div>
    
        <div id="btn" className="flex items-center mb-2">
        <button onClick={submitForm} className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >{submit ? <>Update</> : <>Register</> }</button>
        </div>
      </div>
      </div>
    )}
  
    <h2 className="text-blue-800 text-center text-3xl mb-4">User Details </h2>
    <table className="table-auto border border-gray-300 bg-gray-100 w-full" id="itemList">
      <thead>
    <tr>
        <th className="border-2 border-gray-300 px-4 py-2">ID</th>
        <th className="border-2 border-gray-300 px-4 py-2">Photo</th>
        <th className="border-2 border-gray-300 px-4 py-2">Name</th>
        <th className="border-2 border-gray-300 px-4 py-2">Organization</th>
        <th className="border-2 border-gray-300 px-4 py-2">Mobile No</th>
        <th className="border-2 border-gray-300 px-4 py-2">Email</th>
        <th className="border-2 border-gray-300 px-4 py-2">No of Users</th>
        <th className="border-2 border-gray-300 px-4 py-2">State</th>
        <th className="border-2 border-gray-300 px-4 py-2">Country</th>
        <th className="border-2 border-gray-300 px-4 py-2">Expire Date</th>
        <th className="border-2 border-gray-300 px-4 py-2">Edit</th>
        <th className="border-2 border-gray-300 px-4 py-2">Delete</th>
      </tr>
      </thead>
      <tbody>
      { display }
      </tbody>
    </table>
  </div>
  </div>
   ); 
}

export default Register;