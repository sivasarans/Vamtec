import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Country from "./components/Country";
import State from "./components/State";

const App: React.FC = () => {
  return (
    <>
      <Router > 
        <Routes>
          <Route path="/" element={<Register />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<State />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
