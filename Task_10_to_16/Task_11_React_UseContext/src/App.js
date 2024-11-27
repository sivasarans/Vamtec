import React ,{ useEffect, useState, useContext, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Country from "./components/Country";
import State from "./components/State";
import { Change } from "./components/Page";
import MemoExample from './components/MemoExample';






export let dbx = null;



function App() {



  const {show,setshow} = useContext(Change);
  const display = () =>{
    if(show == 'Register'){
      return <Register />;
    }else if(show == 'Country' ){
      return <Country />;
     }else if(show == 'State' ){
      return <State />;
     }else if(show == 'MemoExample' ){
      return <MemoExample />;
     }
  }

      // Log the page navigation using useMemo
      const logNavigation = useMemo(() => {
        console.log(`Page navigated to: ${show}`);
        return null; //return show ( if error)
    }, [show]);

    // const callbackx = useCallback(()=>{
    //   console.log(`I have memoried the page when is in ${show}`);
    // },[])

  

  


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
    // <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}> {/* added "future" for console error */}
    //       <Routes>
    //       <Route path="/" element={<Register/>}/> 
    //       <Route path="/register" element={<Register />} /> {/* sample */}
    //       <Route path="/country" element={<Country />} />
    //       <Route path="/state" element={<State />} />
    //       <Route path="/x1" element={<ContextProvider />} />
    //       <Route path="/x2" element={<ConsumerComponent />} />
    //       <Route path="/x3" element={<CustomerComponent />} />

    //       {/* <Route path="/Component" element={<Component />} /> */}


    //       </Routes>

    // </Router>
<>
{display()}
    </>



  );
}
export default App;
// export { callbackx };
