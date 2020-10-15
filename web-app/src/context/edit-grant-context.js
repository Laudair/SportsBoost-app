import React, { createContext, useState } from 'react';

export const EditGrant = createContext();

export const EditGrantProvider = ({ children }) => {
  const [editGrant, setEditGrant] = useState('');

  return <EditGrant.Provider value={[editGrant, setEditGrant]}>{children}</EditGrant.Provider>;
};
