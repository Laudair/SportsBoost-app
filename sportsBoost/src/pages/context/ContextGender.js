import React, { createContext, useState } from 'react';

export const ContextGender = createContext();

export const ContextGenderProvider = ({ children }) => {
  const [gender, setGender] = useState();

  return <ContextGender.Provider value={[gender, setGender]}>{children}</ContextGender.Provider>;
};
