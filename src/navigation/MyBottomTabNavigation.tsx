import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@src/styles/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import GroupsScreen from "@screens/Groups";
import FriendsScreen from "@screens/Contacts";
import ActivityScreen from "@screens/History";
import AccountScreen from "@screens/Account/ProfileScreen";

const Tab = createBottomTabNavigator();
//--------------------------------------------------------------------------------------
const CustomTabBarButton = (
  { children, onPress } //this is for plus sign in the middle
) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: SECONDARY_COLOR,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
//--------------------------------------------------------------------------------------
const TabBarButton = ({ accessibilityState, children, onPress }) => {
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
        borderRadius: focused ? 10 : 0,
      }}
      accessibilityState={accessibilityState}
    >
      <View
        style={{
          borderRadius: 20,
          backgroundColor,
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
//--------------------------------------------------------------------------------------
const ActionMenu = ({ navigation,isVisible, onClose }) => {
  //this is the action for plus sign
  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <TouchableOpacity style={Instyles.overlay} onPress={onClose}>
        <View style={Instyles.menuContainer}>
          {/* Menu items go here */}
          <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')} style={Instyles.menuItem}>


            <Ionicons name="people-outline" size={30} color={"white"} />
            <Text style={Instyles.menuText}>New Group</Text>


          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Handle The Action')} style={Instyles.menuItem}>


            <Ionicons name="person-add-outline" size={30} color={"white"} />
            <Text style={Instyles.menuText}>Add Contact</Text>


          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Handle The Action')} style={Instyles.menuItem}>


            <Ionicons name="scan-outline" size={30} color={"white"} />
            <Text style={Instyles.menuText}>Scan Bill</Text>


          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Handle The Action')} style={Instyles.menuItem}>


            <Ionicons name="receipt-outline" size={30} color={"white"} />
            <Text style={Instyles.menuText}>Add Bill</Text>

			
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
//--------------------------------------------------------------------------------------
const Navigation = ({navigation}) => {
  const [isActionMenuVisible, setActionMenuVisible] = useState(false);

  const toggleActionMenu = () => {
    setActionMenuVisible(!isActionMenuVisible);
  };
  //this three line added just for the plus sign action
  //In fact if you dont have the state of the Plus sign
  //you will not undrestand when you should show it to user
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Groups") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Friends") {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "Activity") {
              iconName = focused ? "analytics" : "analytics-outline";
            } else if (route.name === "Account") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: SECONDARY_COLOR,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: (props) => <TabBarButton {...props} />,
          tabBarStyle: {
            borderColor: "#333A4A",
            position: "absolute",
            backgroundColor: "#333A4A",
            height: 70,
          },
        })}
        tabBarOptions={{
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen name="Groups" component={GroupsScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen
          name="Plus"
          component={ActivityScreen} // FORGET ABOUT THIS IT"S JUST A PLACE HOLDER
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add"
                size={40}
                color={"black"}
                style={{ marginLeft: 3 }}
              />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={toggleActionMenu} />
            ),
          }}
        />
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
      <ActionMenu navigation={navigation} isVisible={isActionMenuVisible} onClose={toggleActionMenu} />
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
