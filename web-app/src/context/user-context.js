import React, { createContext, useState } from 'react';

export const UserSearch = createContext();

export const UserSearchProvider = ({ children }) => {
  const [userSearch, setUserSearch] = useState();

  return <UserSearch.Provider value={[userSearch, setUserSearch]}>{children}</UserSearch.Provider>;
};
