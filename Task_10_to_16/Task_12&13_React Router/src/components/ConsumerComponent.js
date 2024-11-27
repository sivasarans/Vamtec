import React, { useContext } from 'react';
import { sampleContext } from './ContextProvider';  // Import the context from ContextProvider

const ConsumerComponent = () => {
  const contextValue = useContext(sampleContext);  // Consume the context value

  return <p>{`Consumed value: ${contextValue}`}</p>;
};

export default ConsumerComponent;
