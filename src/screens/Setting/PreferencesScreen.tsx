import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PRIMARY_COLOR, SECONDARY_COLOR, DARK_GREY } from "@styles/styles";
import ConfirmButton from "@comps/ConfirmButton";
const PreferencesScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [selectedBitcoinUnit, setSelectedBitcoinUnit] = useState("sats");
  const [selectedTheme, setSelectedTheme] = useState("default");
  const handleSave = () => {
    console.log('Handle The function');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Preferences</Text>
      <View style={styles.textAndPicker}>
        <Text style={styles.pickerLabel}>Language</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            style={styles.picker}
            dropdownIconColor={"#fff"}
          >
            <Picker.Item label="English" value="english" />
            {/* Add more language options here */}
          </Picker>
        </View>
      </View>

      <View style={styles.textAndPicker}>
        <Text style={styles.pickerLabel}>Currency</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCurrency}
            onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
            style={styles.picker}
            dropdownIconColor={"#fff"}
          >
            <Picker.Item label="USD" value="usd" />
            {/* Add more currency options here */}
          </Picker>
        </View>
      </View>

      <View style={styles.textAndPicker}>
        <Text style={styles.pickerLabel}>Bitcoin Units</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBitcoinUnit}
            onValueChange={(itemValue) => setSelectedBitcoinUnit(itemValue)}
            style={styles.picker}
            dropdownIconColor={"#fff"}
          >
            <Picker.Item label="Sats" value="sats" />
            {/* Add more bitcoin unit options here */}
          </Picker>
        </View>
      </View>
      <View style={styles.textAndPicker}>
        <Text style={styles.pickerLabel}>Theme</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue) => setSelectedTheme(itemValue)}
            style={styles.picker}
            dropdownIconColor={"#fff"}
          >
            <Picker.Item label="Default" value="default" />
            {/* Add more theme options here */}
          </Picker>
        </View>
      </View>

      <ConfirmButton
          title="SAVE"
          onPress={handleSave} // Disable the button when loading
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingTop: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  pickerContainer: {
    width: "50%",
    height: 50,
    backgroundColor: "#333A4A",
    borderRadius: 10,
    marginBottom: 20,
    top: 15,
  },
  pickerLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  picker: {
    color: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#3282B8",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textAndPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20,
  },
});

export default PreferencesScreen;
