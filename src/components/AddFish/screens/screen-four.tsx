import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

interface ScreenFourProps {
  setFishName: (value: ((prevState: string) => string) | string) => void;
  setPhoto: (value: ((prevState: string) => string) | string) => void;
}

export const ScreenFour = ({setFishName, setPhoto}: ScreenFourProps) => {
  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5, // налаштування якості зображення
      },
      response => {
        if (response.didCancel) {
          Alert.alert('Image selection cancelled');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'An error occurred');
        } else if (response.assets && response.assets[0]) {
          // Перевірка, чи існують assets і перший елемент
          const uri = response.assets[0]?.uri;
          if (uri) {
            setPhoto(uri); // Зберігаємо URI зображення
          }
        }
      },
    );
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Add a picture of{'\n'}fish</Text>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.buttonImage}
          onPress={handleImagePicker}>
          <Image
            source={require('../../../assets/images/image_fish_download.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            marginTop: 30,
            width: 250,
            height: 50,
            backgroundColor: 'rgba(12, 91, 181, 1)',
            borderRadius: 12,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 1,
            paddingLeft: 15,
            paddingRight: 15,
          }}
          placeholder="Fish name"
          onChangeText={setFishName}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
    marginBottom: 8,
    marginLeft: 15,
  },
  buttonImage: {
    width: 277,
    height: 277,
    borderRadius: 277,
  },
});
