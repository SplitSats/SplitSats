import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const GroupCreation = ({ isVisible, onClose, onCreateGroup, setSelectedUsers }) => {
  const userList = ["a", "b", "c"]; 
  const [selectedUsers, internalSetSelectedUsers] = useState([]);


  const handleUserSelection = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const createGroup = () => {
    onCreateGroup(selectedUsers);
    setSelectedUsers(selectedUsers); // Send selected users back to the main view
    internalSetSelectedUsers([]); // Reset the internal state
    onClose();
  };


  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text>Select Users for the New Group:</Text>
        <ScrollView>
          {userList.map((user) => (
            <TouchableOpacity
              key={user}
              onPress={() => handleUserSelection(user)}
            >
              <Text style={selectedUsers.includes(user) ? styles.selectedUser : styles.user}>
                {user}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button title="Create Group" onPress={createGroup} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    fontSize: 16,
  },
  selectedUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GroupCreation;
