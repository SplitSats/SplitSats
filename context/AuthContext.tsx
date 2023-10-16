import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check AsyncStorage for the user's login status
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('userIsLoggedIn');
      setUserIsLoggedIn(!!loggedIn); // Convert to boolean
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
