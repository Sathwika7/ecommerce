import React, { createContext, useState } from 'react';

// Create a context for user-related data
export const UserContext = createContext();

// Create a UserContextProvider component
export const UserContextProvider = ({ children }) => {
  // Define user state and setUser function
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
