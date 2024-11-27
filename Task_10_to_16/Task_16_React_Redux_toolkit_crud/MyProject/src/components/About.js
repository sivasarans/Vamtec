import React from 'react';
import Loginform from "./loginForm";
import { NavLink } from 'react-router-dom';

function About() {
    return (
    <div>
      <NavLink to="/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mb-4 mx-5">Home</NavLink>
      <NavLink  to="/about" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mx-5 mb-4" >About</NavLink>
      <NavLink to="/contact" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mx-5 mb-4">Contact</NavLink>

      <h2 class="text-center font-bold text-xl shadow-lg text-green-500">About Page</h2>
      <Loginform />
    </div>)

}

export default About;
