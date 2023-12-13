
import {
    View,
    StyleSheet,
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have expo/vector-icons installed
import { ScreenStackHeaderConfig } from "react-native-screens";


  const ActionMenu = ({ navigation, isVisible, onClose }) => {
    //this is the action for plus sign
    if (!isVisible) return null;
  

    const handleNewGroup = () => {
        // navigation.replace("CreateNewGroup");
        navigation.navigate("CreateNewGroup");
        onClose(); 
    }
    const handleAddFriends = () => {
        navigation.navigate("AddFriend");
        onClose(); 
    };



    return (
      <Modal transparent visible={isVisible} animationType="fade">
        <TouchableOpacity style={Instyles.overlay} onPress={onClose}>
          <View style={Instyles.menuContainer}>
            {/* Menu items go here */}
            <TouchableOpacity onPress={() => handleNewGroup()} style={Instyles.menuItem}>
              <Ionicons name="people-outline" size={30} color={"white"} />
              <Text style={Instyles.menuText}>New Group</Text> 
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleAddFriends()} style={Instyles.menuItem}>
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

export default ActionMenu;