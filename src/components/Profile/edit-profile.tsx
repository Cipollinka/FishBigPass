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
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../user';

export const EditProfile = () => {
  const navigation = useNavigation();
  const {user, saveUser} = useUser();

  // Ініціалізуємо стан, використовуючи дані з user, якщо вони є
  const [name, setName] = useState<string>(user?.profile?.userName || '');
  const [photo, setPhoto] = useState<string | null>(
    user?.profile?.photo || null,
  );

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('Selection canceled');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Unknown error');
        } else if (response.assets && response.assets.length > 0) {
          const selectedAsset: Asset = response.assets[0];
          setPhoto(selectedAsset.uri || null); // Встановлюємо `null`, якщо `uri` undefined
        }
      },
    );
  };

  const handleSave = () => {
    // Перевірка, чи існує user, перш ніж зберігати
    if (user) {
      saveUser({
        ...user,
        profile: {
          userName: name,
          photo: photo || user?.profile?.photo,
        },
      });
      Alert.alert('Profile updated successfully!');
    } else {
      Alert.alert('Error', 'User data is not available.');
    }
  };

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  return (
    <View>
      <ImageBackground
        style={styles.imgBg}
        source={require('../../assets/images/bg_add_fish.png')}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Edit profile</Text>
          <Text style={styles.label}>Your name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <SafeAreaView style={styles.yourPhotoContainer}>
            <Text style={[styles.label, {marginLeft: -35}]}>Your photo</Text>
            <TouchableOpacity style={styles.photoPicker} onPress={pickImage}>
              {photo ? (
                <Image source={{uri: photo}} style={styles.photo} />
              ) : (
                <Image
                  source={require('../../assets/images/user_photo.png')}
                  style={styles.photo}
                />
              )}
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 30,
  },
  imgBg: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    color: 'white',
    fontSize: 18,
  },
  saveButton: {
    color: '#1e90ff',
    fontSize: 18,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    fontSize: 16,
  },
  photoPicker: {
    width: 166,
    height: 166,
    borderRadius: 166,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  photoIcon: {
    color: 'white',
    fontSize: 24,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  yourPhotoContainer: {
    marginLeft: 40,
    width: 150,
    gap: 10,
  },
});
