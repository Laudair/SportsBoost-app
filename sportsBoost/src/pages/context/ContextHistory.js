import React, { createContext, useState } from 'react';

export const ContextHistory = createContext();

export const ContextHistoryProvider = ({ children }) => {
  const [paidHistory, setPaidHistory] = useState(false);

  return (
    <ContextHistory.Provider value={[paidHistory, setPaidHistory]}>
      {children}
    </ContextHistory.Provider>
  );
};
