import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { PRIMARY_COLOR } from "@styles/styles";
import ButtonConfirm from "@comps/ButtonConfirm";
import Header from "@comps/Header";

const PreferencesScreen = ({ navigation }) => {
  const [preferences, setPreferences] = useState([
    { title: "Language", selectedValue: "english", options: ["english", "spanish", "french"] },
    { title: "Currency", selectedValue: "usd", options: ["usd", "eur", "gbp"] },
    { title: "Bitcoin Units", selectedValue: "sats", options: ["sats", "btc", "mbtc"] },
    { title: "Theme", selectedValue: "default", options: ["default", "dark", "light"] },
  ]);

  const handleSave = () => {
    console.log('Handle The function');
    navigation.navigate("Dashboard")
  };

  const handlePickerPress = (index) => {
    const updatedPreferences = preferences.map((item, i) => {
      if (i === index) {
        return { ...item, showPicker: !item.showPicker };
      }
      return { ...item, showPicker: false };
    });
    setPreferences(updatedPreferences);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.textAndPicker}>
      <Text style={styles.pickerLabel}>{item.title}</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={() => handlePickerPress(index)}>
          <View>
            <Text style={styles.selectedValue}>{item.selectedValue}</Text>
          </View>
        </TouchableOpacity>
        {item.showPicker && (
          <Picker
            selectedValue={item.selectedValue}
            onValueChange={(itemValue) => {
              const updatedPreferences = preferences.map(pref => {
                if (pref.title === item.title) {
                  return { ...pref, selectedValue: itemValue, showPicker: false };
                }
                return pref;
              });
              setPreferences(updatedPreferences);
            }}
            style={styles.picker}
            dropdownIconColor={"#fff"}
          >
            {item.options.map(option => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Preferences" onPressBack={() => navigation.goBack()} />

      <Text style={styles.headerText}>Preferences</Text>

      <FlatList
        data={preferences}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />

      <ButtonConfirm
        title="SAVE"
        onPress={handleSave}
        // Disable the button when loading
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
    backgroundColor: "#333A4A",
    borderRadius: 10,
    marginTop: 10,
  },
  pickerLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  selectedValue: {
    color: "#fff",
    marginLeft: 10,
    marginTop: 15,
  },
  picker: {
    color: "#fff",
    marginLeft: 10,
    marginRight: 10,
  },
  textAndPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default PreferencesScreen;
