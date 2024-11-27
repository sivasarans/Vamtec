import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Country from "./components/Country";
import State from "./components/State";

function App() {

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}> {/* added "future" for console error */}
          <Routes>
          <Route path="/" element={<Register/>}/> 
          <Route path="/register" element={<Register />} /> sample
          <Route path="/country" element={<Country />} />
          <Route path="/state" element={<State />} />
          </Routes>

    </Router>
  );
}
export default App;



















// import React from 'react';
// import Form from './Form';
// import Form2  from './Form2';  // Correct



// const App = () => {
//   return (
//     <div>
//       <h1>Form Submission</h1>
//       <Form />
//       <Form2 />
//     </div>
//   );
// };

// export default App;
