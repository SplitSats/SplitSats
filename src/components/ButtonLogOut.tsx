import { Button } from 'react-native'
import { deleteWallet, NPUB, NSEC } from '@store/secure';


export const handleLogout = async ( ) => {
	// Clear the user session data from AsyncStorage
	try {
		// Navigate back to the Authentication screen
		await deleteWallet(NPUB)
		await deleteWallet(NSEC)
	} catch (error) {
		console.error('Error logging out:', error)
	}
}
