import NDK from '@nostr-dev-kit/ndk'
import React, { createContext, useContext, useEffect,useState } from 'react'
import { Text } from 'react-native'
import { RELAYS } from '../consts/config'

// Create a context for NDK
const NDKContext = createContext()

// Function to create and manage the NDK instance as a singleton
function useNDK() {
	const context = useContext(NDKContext)
	if (!context) {
		throw new Error('useNDK must be used within an NDKProvider')
	}
	return context
}

function NDKProvider({ children }) {
	const [ndk, setNDK] = useState(null)
  
	useEffect(() => {
		const initializeNDK = async () => {
			const ndkInstance = new NDK({ explicitRelayUrls: RELAYS })
			ndkInstance.connect()
			setNDK(ndkInstance)
		}
  
		initializeNDK()
	}, [])
  
	if (!ndk) {
		// You can return a loading indicator or a placeholder here
		return <Text>Loading...</Text>
	}
  
	return <NDKContext.Provider value={ndk}>{children}</NDKContext.Provider>
}
  
export { NDKProvider, useNDK }