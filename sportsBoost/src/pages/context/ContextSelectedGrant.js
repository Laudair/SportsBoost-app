import React, { createContext, useState } from 'react';

export const SelectedGrant = createContext();

export const SelectedGrantProvider = ({ children }) => {
  const [selectedGrant, setSelectedGrant] = useState('');

  return (
    <SelectedGrant.Provider value={[selectedGrant, setSelectedGrant]}>
      {children}
    </SelectedGrant.Provider>
  );
};
