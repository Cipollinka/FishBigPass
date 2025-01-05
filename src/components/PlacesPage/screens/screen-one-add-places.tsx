import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenTwoAddPlaces} from './screen-two-add-places.tsx';
import {Fish, ScreenThreeAddPlaces} from './screen-three-add-places.tsx';
import {
  ScreenName,
  useNavigation,
} from '../../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../user';

// Оголошення типів для стейту
interface PlaceData {
  placesDescription: string;
  placesName: string;
  airTemp: string;
  reservoir: string;
}

export const ScreenOneAddPlaces = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const [page, setPage] = useState('one');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [placesName, setPlacesName] = useState('');
  const [reservoir, setReservoir] = useState('');
  const [airTemp, setAirTemp] = useState('');
  const [placesDescription, setPlacesDescription] = useState('');
  const [placesFish, setPlacesFish] = useState<Fish[]>([]); // Масив для риб
  const [placesData, setPlaceData] = useState<PlaceData>({
    placesDescription: '',
    placesName: '',
    airTemp: '',
    reservoir: '',
  });

  const handleSaveCoordinates = () => {
    if (latitude && longitude) {
      Alert.alert(
        'Saved Coordinates',
        `Latitude: ${latitude}\nLongitude: ${longitude}`,
      );
    } else {
      Alert.alert('Please fill in both Latitude and Longitude');
    }
  };

  const handleNext = () => {
    if (page === 'one') {
      if (!latitude || !longitude) {
        Alert.alert(
          'Please fill in both Latitude and Longitude before proceeding.',
        );
        return;
      }
      setPage('two');
    } else if (page === 'two') {
      if (!placesName || !reservoir || !airTemp || !placesDescription) {
        Alert.alert('Please fill in all fields before proceeding.');
        return;
      }
      setPage('three');
    } else if (page === 'three') {
      handleSave(); // Save data when on the last page
    }
  };

  const handleBack = () => {
    if (page === 'three') {
      setPage('two');
    } else if (page === 'two') {
      setPage('one');
    } else if (page === 'one') {
      navigation.navigate(ScreenName.Main);
    }
  };

  const saveDataToUser = () => {
    const newPlace = {
      coordinates: {latitude, longitude},
      name: placesName,
      reservoir,
      airTemp,
      description: placesDescription,
      fish: placesFish,
    };

    if (saveUser) {
      saveUser(prevUser => {
        // Ensure prevUser is not undefined or null
        if (!prevUser) {
          return {
            places: [newPlace], // Initialize with the new place if no previous user exists
          };
        }
        return {
          ...prevUser,
          places: [...prevUser.places, newPlace], // Append new place to the existing list of places
        };
      });
    } else {
      Alert.alert('Error', 'Unable to save user data');
    }

    Alert.alert('Success', 'Your place has been saved!');
    navigation.navigate(ScreenName.Main); // Navigate to the main screen after saving
  };

  const handleSave = () => {
    if (
      !latitude ||
      !longitude ||
      !placesName ||
      !reservoir ||
      !airTemp ||
      !placesDescription
    ) {
      Alert.alert('Please fill in all fields before saving.');
      return;
    }
    saveDataToUser(); // Call the save function
  };

  const renderScreenTwo = () => {
    switch (page) {
      case 'two':
        return (
          <ScreenTwoAddPlaces
            setPlaceData={setPlaceData}
            placesName={placesName}
            reservoir={reservoir}
            airTemp={airTemp}
            placesDescription={placesDescription}
            setPlacesName={setPlacesName}
            setReservoir={setReservoir}
            setAirTemp={setAirTemp}
            setPlacesDescription={setPlacesDescription}
          />
        );
      case 'three':
        return <ScreenThreeAddPlaces setPlacesFish={setPlacesFish} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imageBgMain}
        source={require('../../../assets/images/bg_add_fish.png')}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.btnBack}>
            <Image
              source={require('../../../assets/images/icons/chevron_left.png')}
            />
            <Text style={styles.textButton}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.btnNext}>
            <Text style={styles.textButton}>Next</Text>
          </TouchableOpacity>
        </View>

        {page === 'one' ? (
          <View style={{alignItems: 'center', gap: 50}}>
            <SafeAreaView style={styles.input_container}>
              <TextInput
                onChangeText={setLatitude}
                style={styles.input}
                placeholder="Latitude"
                value={latitude}
              />
              <TextInput
                onChangeText={setLongitude}
                style={styles.input}
                placeholder="Longitude"
                value={longitude}
              />
            </SafeAreaView>
            <TouchableOpacity
              onPress={handleSaveCoordinates}
              style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>Save coordinates</Text>
            </TouchableOpacity>
          </View>
        ) : (
          renderScreenTwo()
        )}

        {page === 'three' && (
          <TouchableOpacity onPress={handleSave} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>Save place</Text>
          </TouchableOpacity>
        )}

        <Image
          style={{width: '100%'}}
          source={require('../../../assets/images/bg_add_fish_footer.png')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBgMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 50,
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnNext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButton: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
  },
  toggleButton: {
    width: 250,
    height: 50,
    backgroundColor: 'rgba(30, 144, 255, 1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: 'rgba(12, 91, 181, 1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
  input_container: {
    gap: 50,
  },
});
