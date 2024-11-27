import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Redux store
import Register from "./components/Register";
import Country from "./components/Country";
import State from "./components/State";

function App() {
  return (
    <Provider store={store}>
      <Router
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }} // Fixed Router warnings
      >
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<State />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
