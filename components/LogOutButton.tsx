import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';


const LogOutButton = ({ navigation }) => {

    const handleLogout = async () => {
        // Clear the user session data from AsyncStorage
        try {
          await AsyncStorage.removeItem('userIsLoggedIn');
          await AsyncStorage.removeItem('userPrivateKey')
          await AsyncStorage.removeItem('userPublicKey')
          // Navigate back to the Authentication screen
          navigation.navigate('Authentication');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    
    return (
        <Button title="Log Out" onPress={handleLogout} />
    );
};

export default LogOutButton;
