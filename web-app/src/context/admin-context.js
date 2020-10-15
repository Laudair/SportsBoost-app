import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [adminSearch, setAdminSearch] = useState();

  return <AdminContext.Provider value={[adminSearch, setAdminSearch]}>{children}</AdminContext.Provider>;
};
