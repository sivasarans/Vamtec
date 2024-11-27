import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import React  from "react";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Register from "./components/Register";
import Country  from './components/Country';
import State from './components/State';

function App() {


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Register />} />
      <Route path="/state" element={<State />} />
      <Route path="/country" element={<Country />} />
    </Route>
  )
)

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
 ); 
}

export default App;
