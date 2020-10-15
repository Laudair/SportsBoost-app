import React, { createContext, useState } from 'react';

export const ContextUser = createContext();

export const ContextUserProvider = ({ children }) => {
  const [emailUser, setEmailUser] = useState('');

  return <ContextUser.Provider value={[emailUser, setEmailUser]}>{children}</ContextUser.Provider>;
};
