import NDK from '@nostr-dev-kit/ndk'
import React, { createContext, useContext, useEffect,useState } from 'react'
import { Text } from 'react-native'
import { RELAYS } from '@consts/config'
import { secureStore } from '@src/storage/store'
import { SECRET } from '@store/consts'

import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk/'
import { l } from '@log'
// Create a context for NDK

type NDKContextType = NDK | null | undefined

export const NDKContext = createContext<NDKContextType>(null)

type NDKProviderProps = {
	children: React.ReactNode
}

// Function to create and manage the NDK instance as a singleton
export function useNDK() {
	const context = useContext(NDKContext)
	if (!context) {
		throw new Error('useNDK must be used within an NDKProvider')
	}
	return context
}

export const NDKProvider: React.FC<NDKProviderProps> = ({ children }) => {
	const [ndk, setNDK] = useState<NDK>()

	useEffect(() => {
		const initializeNDK = async () => {
			const privateKey = await secureStore.get(SECRET)
			if (!privateKey) {
				l('No private key found in storage')
				return
			}
			const signer = new NDKPrivateKeySigner(privateKey || '');
			const ndkInstance = new NDK({ explicitRelayUrls: RELAYS, signer: signer })
			await ndkInstance.connect()
			setNDK(ndkInstance)
		}
  
		initializeNDK()
	}, [])
  
	return (
		<NDKContext.Provider value={ndk}>
			{children}
		</NDKContext.Provider>
	)
}
  