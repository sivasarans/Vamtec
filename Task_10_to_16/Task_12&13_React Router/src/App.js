import React ,{ useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Country from "./components/Country";
import State from "./components/State";
import ContextProvider from './components/ContextProvider';
import ConsumerComponent from './components/CustomerComponent';
import CustomerComponent from './components/CustomerComponent';




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

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}> {/* added "future" for console error */}
          <Routes>
          <Route path="/" element={<Register/>}/> 
          <Route path="/register" element={<Register />} /> {/* sample */}
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<State />} />
          <Route path="/x1" element={<ContextProvider />} />
          <Route path="/x2" element={<ConsumerComponent />} />
          <Route path="/x3" element={<CustomerComponent />} />

          {/* <Route path="/Component" element={<Component />} /> */}


          </Routes>

    </Router>
  );
}
export default App;
