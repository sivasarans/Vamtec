import React ,{ useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContextProvider from './components/ContextProvider';
import ConsumerComponent from './components/CustomerComponent';
import CustomerComponent from './components/CustomerComponent';

function App() {
  
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}> {/* added "future" for console error */}
          <Routes>
 
          <Route path="/x1" element={<ContextProvider />} />
          <Route path="/x2" element={<ConsumerComponent />} />
          <Route path="/x3" element={<CustomerComponent />} />

          {/* <Route path="/Component" element={<Component />} /> */}


          </Routes>

    </Router>
  );
}
export default App;
