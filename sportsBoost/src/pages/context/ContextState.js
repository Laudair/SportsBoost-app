import React, { createContext, useState } from 'react';

export const ContextState = createContext();

export const ContextStateProvider = ({ children }) => {
  const [state, setState] = useState();

  return <ContextState.Provider value={[state, setState]}>{children}</ContextState.Provider>;
};
