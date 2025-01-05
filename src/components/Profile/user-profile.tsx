import React from 'react';
import {
  Image,
  ImageBackground, Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../user';

export const UserProfile = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate(ScreenName.EditProfile);
  };
  console.log('Profile', user?.profile);
  return (
    <View style={styles.glob_container}>
      <View style={styles.container}>
        <View style={{backgroundColor: 'yellow', width: '100%'}}>
          <ImageBackground
            style={{
              width: '100%',
              height: 192,
            }}
            source={require('../../assets/images/header_profile.png')}>
            <View style={{flexDirection: 'row', marginLeft: 45}}>
              <Text style={styles.header}>Profile</Text>
              <TouchableOpacity style={styles.avatarContainer}>
                <Image
                  source={require('../../assets/images/user.png')} // Замініть на URL вашого аватара
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Fish caught</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Recipes have been created</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleEdit} style={styles.button}>
          <Text style={styles.buttonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.termsfeed.com/live/c8ae13a1-f901-4143-b85f-c6986e61cc74',
            )
          }>
          <Text style={styles.footerLink}>Terms of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.termsfeed.com/live/c8ae13a1-f901-4143-b85f-c6986e61cc74',
            )
          }>
          <Text style={styles.footerLink}>Developer Website</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.termsfeed.com/live/c8ae13a1-f901-4143-b85f-c6986e61cc74',
            )
          }>
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  glob_container: {
    width: '100%',
    gap: 200,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'rgba(255, 255, 255, 1)',
  },
  avatarContainer: {
    width: 170,
    height: 170,
    marginTop: 100,
    backgroundColor: 'green',
    borderRadius: 170,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 4,
    borderColor: '#0077b6',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
    marginBottom: 30,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    maxWidth: 80,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    // marginTop: 'auto',
    // marginBottom: 20,
    // bottom: -100,
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
  },
});
