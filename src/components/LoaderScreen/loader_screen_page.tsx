import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';

export const Loader = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.navigate(ScreenName.Main);
  }, 2500);
  return (
    <View>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../assets/images/loaderBg.png')}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/welcom.png')}
        />
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 50, // Регулювати відстань між логотипом та loader
  },
  loader: {
    marginTop: 20,
  },
});
