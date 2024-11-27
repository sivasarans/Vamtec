import React, { useContext } from 'react';
import { sampleContext } from './ContextProvider';  // Import the context from ContextProvider

const CustomerComponent = () => {
  const contextValue = useContext(sampleContext);  // Consume the context value

  return <p>{`Customer Component value: ${contextValue}`}</p>;
};

export default CustomerComponent;
