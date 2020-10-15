import React, { createContext, useState } from 'react';

export const ContextAge = createContext();

export const ContextAgeProvider = ({ children }) => {
  const [age, setAge] = useState();

  return <ContextAge.Provider value={[age, setAge]}>{children}</ContextAge.Provider>;
};
