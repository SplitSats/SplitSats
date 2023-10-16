import React, { createContext, useContext, useState, useEffect } from 'react';
import NDK from "@nostr-dev-kit/ndk";
import { RELAYS } from '../constants/config';

// Create a context for NDK
const NDKContext = createContext();

// Function to create and manage the NDK instance as a singleton
function useNDK() {
  const context = useContext(NDKContext);
  if (!context) {
    throw new Error('useNDK must be used within an NDKProvider');
  }
  return context;
}

function NDKProvider({ children }) {
    const [ndk, setNDK] = useState(null);
  
    useEffect(() => {
      const initializeNDK = async () => {
        const ndkInstance = new NDK({ explicitRelayUrls: RELAYS });
        await ndkInstance.connect();
        setNDK(ndkInstance);
      };
  
      initializeNDK();
    }, []);
  
    if (!ndk) {
      // You can return a loading indicator or a placeholder here
      return <p>Loading...</p>;
    }
  
    return <NDKContext.Provider value={ndk}>{children}</NDKContext.Provider>;
  }
  
  export { NDKProvider, useNDK };