import NDK from '@nostr-dev-kit/ndk'
import React, { createContext, useContext, useEffect,useState } from 'react'
import { getWallet, PRIVATE_KEY_HEX, NPUB, NSEC } from '@store/secure';
import { IProfileContent } from '@model/nostr';
import { defaultRelays, EventKind } from '@nostr/consts';
import { getPublicKey, nip19 } from 'nostr-tools';
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
	// if (!context) {
	// 	throw new Error('useNDK must be used within an NDKProvider')
	// }
	return context
}

export const NDKProvider: React.FC<NDKProviderProps> = ({ children }) => {
	const [ndk, setNDK] = useState<NDK>()

	useEffect(() => {
		const initializeNDK = async () => {
			const privateKey = await getWallet(PRIVATE_KEY_HEX);
			if (!privateKey) {
				l('No private key found in storage')
				return
			}
			const signer = new NDKPrivateKeySigner(privateKey || '');
			const ndkInstance = new NDK({ explicitRelayUrls: defaultRelays, signer: signer })
			await ndkInstance.connect()
			setNDK(ndkInstance)
			l('NDK initialized')
		}
  
		initializeNDK()
	}, [])
  
	return (
		<NDKContext.Provider value={ndk}>
			{children}
		</NDKContext.Provider>
	)
}
  