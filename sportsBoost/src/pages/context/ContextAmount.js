import React, { createContext, useState } from 'react';

export const ContextAmount = createContext();

export const ContextAmountProvider = ({ children }) => {
  const [amount, setAmount] = useState();

  return <ContextAmount.Provider value={[amount, setAmount]}>{children}</ContextAmount.Provider>;
};
