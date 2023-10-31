import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { nip19 } from 'nostr-tools'
import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet,Text, View } from 'react-native'
import { AsyncStore } from '@src/storage/store/AsyncStore'
import { useNDK } from '@src/context/NDKContext'
import { l } from '@log'
import { IProfileContent } from '@src/model/nostr'

const UserProfile = ({ }) => {
	const ndk = useNDK()
	const [userProfile, setUserProfile] = useState<IProfileContent | null>(null);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				if (!ndk) {
					throw new Error('NDK not initialized')
				}
            
				const userNpub = AsyncStorage.getItem('userNpub')
				if (!userNpub){
					console.log('UserPublicKey not found in local storage')
					l('UserPublicKey not found in local storage')
				}
				console.log('userNpub:', userNpub)
				l('userNpub:', userNpub)
				const user = ndk.getUser({ npub: userNpub })
				const userProfile = await user.fetchProfile()
				if (!userProfile) {
					throw new Error('User profile not found')
				}
				setUserProfile(userProfile)
				console.log(user.profile)
			} catch (error) {
				console.error('Error fetching user profile:', error)
			}
		}
    
		fetchUserProfile()
	}, [ndk])

	return (
		<View style={styles.container}>
			<View style={styles.userInfo}>
				<View style={styles.textContainer}>
					<Text style={styles.welcome}>Hello, {userProfile?.name}</Text>
					<Text style={styles.subtitle}>Split your sats</Text>
				</View>
				<Image source={require('@assets/icon.png')} style={styles.userPhoto} />
			</View>
		</View>
	)    
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textContainer: {
		flex: 1,
	},
	welcome: {
		fontSize: 30, // Adjust the font size as needed
		color: 'white',
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 20, // Adjust the font size as needed
		color: 'white',
	},
	userPhoto: {
		width: 100,
		height: 100,
		borderRadius: 50, // To make it rounded
		marginLeft: 20, // Add some margin between the text and image
	},
})

export default UserProfile