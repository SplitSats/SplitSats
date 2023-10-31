import CreateAccountWrap from "@comps/CreateAccountWrap";
import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { PRIMARY_COLOR } from '@styles/styles'



const ConfirmationAccount = ({navigation}) => {
  
  const handleCreateAccount = async () => {
    navigation.replace('AccountCreated')
}
return(
    <View style={styles.container}>
         <Text style={styles.headerText}>CONFIRM</Text>
        <View style={styles.cardContainer}>
            <CreateAccountWrap />
        </View>
        <Text style={styles.noteTextt}>
        This is a preview of your Nostr account.
        You can always change your info from the profile settings.
        </Text>
        <View style={styles.button}>
          <Button title="CREATE ACCOUNT"
            onPress={handleCreateAccount}
            />
		    </View>
    </View>

)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: PRIMARY_COLOR,
      padding: 20,
      alignItems: 'center',
    },
    cardContainer:{
        width:'100%',
        borderWidth:3,
        borderColor:'#83A3EE',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
        alignSelf:'flex-start',
        marginBottom: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    noteTextt: {
      color: 'white',
      padding:30,
      textAlign:'center',
      fontSize:16,
    },
    button: {
		position:'absolute',
		borderRadius: 25, 
		backgroundColor: '#3282B8', // Color of the button
		width:'90%',
		height:50,
		alignSelf: 'center', 
		overflow: 'hidden',
		bottom: 20,
	  },
  });

export default ConfirmationAccount

