import React, { createContext, useState } from 'react';

export const ContextType = createContext();

export const ContextTypeProvider = ({ children }) => {
  const [type, setType] = useState();

  return <ContextType.Provider value={[type, setType]}>{children}</ContextType.Provider>;
};
