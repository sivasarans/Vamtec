import React ,{ useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Using <BrowserRouter> with an Alias

import Register from "./components/Register";
import Country from "./components/Country";
import State from "./components/State";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Loginform from "./components/loginForm";

import { useDispatch,useSelector } from "react-redux";
// import Loginform from "./components/loginForm";


export let dbx = null;



function App() {
  




  


  useEffect(()=>{
    const x=indexedDB.open("ReactDemo!",1);
    x.onupgradeneeded = (e) => { 
      dbx = e.target.result;
      // Create object stores with 'id' as the keyPath
      dbx.createObjectStore("register", { keyPath: "id", autoIncrement: true });
      dbx.createObjectStore("country", { keyPath: "id", autoIncrement: true });
      dbx.createObjectStore("state", { keyPath: "id", autoIncrement: true });
  };
  
    x.onsuccess = (e) => {       dbx = e.target.result;      console.log("db Initialized");}
    x.onerror = (e) => {console.log("db Error",e.target.error);}},[]);

  return (<>
        {/* <LoginForm /> */}

    <BrowserRouter basename="/test">
        {/* <Router> //we may also use like this */}

          <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/register" element={<Register />} /> {/* inside of"register" in inside of "test" path , the function will be rendered  */} 
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<State />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />




          </Routes>

          </BrowserRouter>
              


<BrowserRouter>
        <Routes>
        <Route path="/" element={<Register />} /> {/* Matches /register */}

          <Route path="/register" element={<Register />} /> {/* Matches /register */}
          <Route path="/country" element={<Country />} /> {/* Matches /country */}
          <Route path="/state" element={<State />} /> {/* Matches /state */}
        </Routes>
      </BrowserRouter>
</>
              
              
  );
}
export default App;
