import React from 'react'
import { Image, StyleSheet,Text, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-picker'

const AddImageButton = ({ label, onSelectImage }) => {
	const handleImagePick = () => {
		const options = {
			title: 'Select an Image',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		}

		// Open the image picker dialog
		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('Image selection canceled')
			} else if (response.error) {
				console.log('Image picker error: ', response.error)
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton)
			} else {
				// The selected image data is in response.uri
				onSelectImage(response.uri)
			}
		})
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.container} onPress={handleImagePick}>
				<Image
					source={require('../assets/icon/camera-upload.svg')}
					style={styles.icon}
				/>
				<Text style={styles.label}>{label}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	icon: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: 'lightgray',
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		marginTop: 5,
		color: 'black',
		textAlign: 'center',
	},
})

export default AddImageButton
