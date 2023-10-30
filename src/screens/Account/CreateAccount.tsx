import AsyncStorage from '@react-native-async-storage/async-storage'
import { generatePrivateKey, getPublicKey , nip19 } from 'nostr-tools'
import React, { useState } from 'react'
import { Button, Image, StyleSheet,Text, TextInput, View } from 'react-native'
import ImageUploadComponent from '@comps/ImageUploadComponent'
import updateNostrProfile from '@nostr/updateProfile'
import { useAuth } from '@src/context/AuthContext' // Import the AuthContext
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/styles'
import { IProfileContent } from '@src/model/nostr';


const CreateAccountScreen = ({ navigation }) => {
	const [imageUri, setImageUri] = useState<string | ''>('');
	const [username, setUsername] = useState('')
	const [userProfile, setUserProfile] = useState<UserProfile>({
		name: 'walter',
		nip05: 'walter@nostr.com',
		lud16: 'wally@getalby.com',
	})
	
	const handleNextButton = async (userProfile) => {

		navigation.replace('ConfirmCreateAccount', userProfile)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>NEW ACCOUNT</Text>
			<ImageUploadComponent imageUri={imageUri} setImageUri={setImageUri} />
			<Text style={styles.label}>USERNAME*</Text>
			<TextInput
				style={styles.input}
				placeholder={username}
				value={username}
				onChangeText={setUsername}
			/>
			<Text style={styles.label}>DISPLAY NAME</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.lud16}
				value={userProfile.lud16} // Display the name from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, name: text })} // Update the UserProfile on input change
			/>
			<Text style={styles.label}>LN URL</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.lud16}
				value={userProfile.lud16} // Display the LN Address from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, lud16: text })} // Update the UserProfile on input change
			/>
			<Text style={styles.label}>NOSTR VERIFICATION (NIP05)</Text>
			<TextInput
				style={styles.input}
				placeholder={userProfile.nip05}
				value={userProfile.nip05} // Display the NIP05 from the UserProfile
				onChangeText={(text) => setUserProfile({ ...userProfile, nip05: text })} // Update the UserProfile on input change
			/>
			<Button title="NEXT" style={styles.button} onPress={() => handleNextButton({...userProfile})} />
			{/* <TouchableOpacity onPress={() => console.log('Next button pressed')}>
				<View style={styles.continueButton}>
					<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>NEXT</Text>
				</View>
        	</TouchableOpacity> */}
			
		
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: PRIMARY_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	input: {
		width: '80%',
		height: 40,
		color: 'white',
		backgroundColor: '#333A4A',
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
	},
	button: {
		width: '100%',
		height: 50,
		backgroundColor: '#0000FF', // This is a placeholder color. Adjust it to match the exact shade you want.
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
	fontSize: 16,
	color: '#FFFFFF',
	fontWeight: 'bold',
	},
	label: {
		alignSelf: 'flex-start',  // Aligns text to the left
		marginLeft: '10%',
		color: '#B0B0B0',
		marginBottom: 8,  // Adjust as per spacing required between label and input
	},
	photoIcon: {
		width: 100,
		height: 100,
		backgroundColor: '#282828',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginBottom: 20,
	  }
})

export default CreateAccountScreen