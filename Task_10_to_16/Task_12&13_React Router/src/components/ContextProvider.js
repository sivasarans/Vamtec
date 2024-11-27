import React, { useState, createContext } from 'react';
import ConsumerComponent from './ConsumerComponent';
import CustomerComponent from './CustomerComponent';

// Create a context to share data between components
export const sampleContext = createContext();

const ContextProvider = () => {
  const [rough1, setRough1] = useState('sample_description');

  return (
    // Provide the context value to children components
    <sampleContext.Provider value={rough1}>
      <h1>{`Hello ${rough1}!`}</h1>
      {/* ConsumerComponent will consume the context value */}
      <ConsumerComponent />
      <CustomerComponent />
    </sampleContext.Provider>
  );
};

export default ContextProvider;
