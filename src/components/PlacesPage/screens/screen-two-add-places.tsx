import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface ScreenTwoAddPlacesProps {
  setPlacesName?: (value: ((prevState: string) => string) | string) => void;
  setReservoir?: (value: ((prevState: string) => string) | string) => void;
  setAirTemp?: (value: ((prevState: string) => string) | string) => void;
  setPlacesDescription?: (
    value: ((prevState: string) => string) | string,
  ) => void;
  placesName?: string;
  reservoir?: string;
  airTemp?: string;
  placesDescription?: string;
  setPlaceData: (value: {
    placesDescription: string;
    placesName: string;
    airTemp: string;
    reservoir: string;
  }) => void;
}

export const ScreenTwoAddPlaces = ({
  setPlacesName,
  setReservoir,
  setAirTemp,
  setPlacesDescription,
  placesName,
  reservoir,
  airTemp,
  placesDescription,
  setPlaceData,
}: ScreenTwoAddPlacesProps) => {
  const handleSave = () => {
    if (!placesName || !reservoir || !airTemp || !placesDescription) {
      Alert.alert('Error', 'Please fill in all fields before saving.');
      return;
    }

    const placeData = {
      placesName,
      reservoir,
      airTemp,
      placesDescription,
    };

    setPlaceData(placeData); // Викликаємо функцію для збереження даних

    Alert.alert('Success', 'Place data has been saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add place</Text>

      <SafeAreaView>
        <Text style={styles.paragraph}>Place name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter place name"
          placeholderTextColor="#ffffff"
          value={placesName}
          onChangeText={setPlacesName}
        />
      </SafeAreaView>
      <SafeAreaView>
        <Text style={styles.paragraph}>Type of reservoir</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter type of reservoir"
          placeholderTextColor="#ffffff"
          value={reservoir}
          onChangeText={setReservoir}
        />
      </SafeAreaView>
      <SafeAreaView>
        <Text style={styles.paragraph}>Air temperature (°C)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter °C"
          placeholderTextColor="#ffffff"
          keyboardType="numeric"
          value={airTemp}
          onChangeText={setAirTemp}
        />
      </SafeAreaView>
      <SafeAreaView>
        <Text style={styles.paragraph}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          placeholderTextColor="#ffffff"
          multiline={true}
          numberOfLines={7}
          value={placesDescription}
          onChangeText={setPlacesDescription}
        />
      </SafeAreaView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Place</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: 326,
    backgroundColor: '#1A4CAD',
    borderRadius: 10,
    color: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  saveButton: {
    width: 250,
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
