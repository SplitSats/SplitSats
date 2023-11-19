import { Button } from 'react-native'
import { deleteWallet, NPUB, NSEC } from '@store/secure';

const LogOutButton = ({ navigation }) => {

	const handleLogout = async () => {
		// Clear the user session data from AsyncStorage
		try {
			// Navigate back to the Authentication screen
			await deleteWallet(NPUB)
			await deleteWallet(NSEC)
			navigation.navigate('Authentication')
		} catch (error) {
			console.error('Error logging out:', error)
		}
	}
    
	return (
		<Button title="Log Out" onPress={handleLogout} />
	)
}

export default LogOutButton
