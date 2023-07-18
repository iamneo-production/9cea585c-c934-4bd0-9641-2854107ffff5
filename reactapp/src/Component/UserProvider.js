import React, { createContext, useCallback, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('guest'); // Set the default userRole to 'guest'

  const setUser = useCallback((role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userExpiration', Date.now() + 3600000); // Set expiration time to 1 hour from now
  }, []);

  const clearUser = useCallback(() => {
    setUserRole('guest'); // Reset userRole to 'guest' when clearing user
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userExpiration');
  }, []);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    const userExpiration = localStorage.getItem('userExpiration');

    if (storedUserRole && userExpiration && Date.now() < userExpiration) {
      setUserRole(storedUserRole);

      // Set a timer to clear the user after 1 hour
      const timer = setTimeout(clearUser, userExpiration - Date.now());

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    } else {
      clearUser();
    }
  }, [setUser, clearUser]);

  const userContextValue = {
    userRole,
    setUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
