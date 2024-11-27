import React ,{ useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Country from "./components/Country";
import State from "./components/State";
import Loginform from "./components/loginForm";

function App() {
 
  return (<>
  <BrowserRouter>
        <Routes>
        <Route path="/" element={<Loginform />} /> {/* Matches /register */}
          <Route path="/register" element={<Register />} /> {/* Matches /register */}
          <Route path="/country" element={<Country />} /> {/* Matches /country */}
          <Route path="/state" element={<State />} /> {/* Matches /state */}
        </Routes>
      </BrowserRouter>


    <BrowserRouter basename="/test">
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
            

</>)}
export default App;

