import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@src/styles/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo

import GroupsScreen from "@screens/Groups";
import FriendsScreen from "@screens/Contacts";
import ActivityScreen from "@screens/History";
import AccountScreen from "@screens/Account";
// import SvgUri from "expo-svg-uri"; // Import SvgUri from Expo
import SvgUri from "react-native-svg"; // Import the necessary component for SVG rendering

import { useUserProfileStore } from '@store';
import ActionMenu from "@comps/ActionMenu";

const Tab = createBottomTabNavigator();
//--------------------------------------------------------------------------------------

const CustomTabBarButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: SECONDARY_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
      // marginBottom: 50,
    }}
    onPress={onPress}
  >
    <MaterialIcons
      name="add"
      size={40}
      color={PRIMARY_COLOR}
    />
  </TouchableOpacity>
);


//--------------------------------------------------------------------------------------
const TabBarButton = ({ accessibilityState, children, onPress, icon, image }) => {
  //this is for the rest of Icons
  const focused = accessibilityState.selected;
  const backgroundColor = focused ? "rgba(0,0,0,0.6)" : "transparent"; // Active tab has opacity

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10, // Bottom padding for space
      }}
      accessibilityState={accessibilityState}
    >
      <View
        style={{
          width: 70, 
          height: 70,
          borderRadius: 10,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >        
        {typeof icon === "string" && icon.includes(".svg") ? (
          <SvgUri
            width="30" // Adjust width and height as needed
            height="30"
            source={icon} // Pass the path to your SVG image from assets
          />
        ): ( icon && image ? ( // Check if icon is truthy (not empty or undefined)
        <Image // Render the user's profile picture as an Image component
          source={{ uri: icon }}
          style={{ 
            width: 30, 
            height: 30, 
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "white",
          }}
        />
      ) : null 
      )}
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Navigation = ({navigation}) => {
  const [isActionMenuVisible, setActionMenuVisible] = useState(false);
  const { userProfile } = useUserProfileStore();
  const [accountIcon, setAccountIcon] = useState(""); // State to store the user's profile picture URL
  
  useEffect(() => {
    if (userProfile?.picture) {
      setAccountIcon(userProfile.picture); // Set the user's profile picture as the icon for the Account tab
    }
  }, [userProfile]);

  const toggleActionMenu = () => {
    setActionMenuVisible(!isActionMenuVisible);
  };
  return (
    <>
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
         
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: SECONDARY_COLOR,
          tabBarShowLabel: true,
          headerShown: false,
          tabBarButton: (props) => {
            let iconPath;
            let image=false;
            // Determine the icon path based on the route name
            if (route.name === "Groups") {
              iconPath = require("@assets/icon/groups.svg");
            } else if (route.name === "Friends") {
              iconPath = require("@assets/icon/contacts.svg");
            } else if (route.name === "Activity") {
              iconPath = require("@assets/icon/activity.svg");
            } else if (route.name === "Account") {
              iconPath = accountIcon || ""; // Use the user's profile picture for the Account tab
              image=true;
            }
            return (
              <TabBarButton
                {...props}
                icon={iconPath} // Pass the respective SVG image path or user's profile picture
                image={image}
              />
            );
          },
          // tabBarButton: (props) => <TabBarButton {...props} />,
          tabBarStyle: {
            borderTopColor: 'transparent',
            backgroundColor: '#333A4A',
            height: '10%', // Set the height of the navigation bar
            justifyContent: 'flex-end', // Align items at the bottom
            paddingBottom: 5, // Add extra padding at the bottom
          },
        })}
        
      >
        <Tab.Screen name="Groups" component={GroupsScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen
          name="Plus"
          component={ActivityScreen} // FORGET ABOUT THIS IT"S JUST A PLACE HOLDER
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={toggleActionMenu} />
            ),
          }}
        />
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
      <ActionMenu navigation={navigation} isVisible={isActionMenuVisible} onClose={toggleActionMenu} />
    </View>
    </>
  );
};
//--------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Navigation;

//I put the Name Instyle because we imported Instyle from other folders , cannot put this variables there
//there are other styles with the same name
//for the sake of simplicity I didn't change the names
const Instyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dimmed background
  },
  menuContainer: {
    position: "absolute",
    right: 0,
    top: 500,
    borderRadius: 10,
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    // Add padding, margin, etc. if needed
  },
  menuText: {
    color: "white",
    marginLeft: 10,
    // Style your menu text here
  },
  // ... Other styles you may need
});