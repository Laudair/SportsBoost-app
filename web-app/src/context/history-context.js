import React, { createContext, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryContextProvider = ({ children }) => {
  const [historySearch, setHistorySearch] = useState();

  return <HistoryContext.Provider value={[historySearch, setHistorySearch]}>{children}</HistoryContext.Provider>;
};
