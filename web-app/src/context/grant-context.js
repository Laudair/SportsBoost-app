import React, { createContext, useState } from 'react';

export const GrantSearch = createContext();

export const GrantSearchProvider = ({ children }) => {
  const [grantSearch, setGrantSearch] = useState('');

  return <GrantSearch.Provider value={[grantSearch, setGrantSearch]}>{children}</GrantSearch.Provider>;
};
