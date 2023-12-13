import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY, SOFT_GREY, FILL_CARD_COLOR, FILL_CARD_COLOR_SOFT } from "@styles/styles";

const ConfirmModal = ({ isVisible, onClose, title, description, leftButtonTitle, rightButtonTitle, onLeftButtonPress, onRightButtonPress }) => {
  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <TouchableOpacity style={Instyles.overlay} onPress={onClose}>
        <View style={Instyles.modalContainer}>
          <View style={Instyles.modalContent}>
            <Text style={Instyles.modalTitle}>{title}</Text>
            <Text style={Instyles.modalDescription}>{description}</Text>
          </View>
          <View style={Instyles.buttonContainer}>
            <TouchableOpacity
              style={[Instyles.button, { backgroundColor: FILL_CARD_COLOR_SOFT }]}
              onPress={onLeftButtonPress}
            >
              <Text style={[Instyles.buttonText, { color: 'white' }]}>{leftButtonTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Instyles.button, { backgroundColor: SECONDARY_COLOR }]}
              onPress={onRightButtonPress}
            >
              <Text style={[Instyles.buttonText, { color: PRIMARY_COLOR }]}>{rightButtonTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const Instyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 20,
    backgroundColor: FILL_CARD_COLOR,
    padding: 20,
  },
  modalContent: {
    marginBottom: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmModal;
