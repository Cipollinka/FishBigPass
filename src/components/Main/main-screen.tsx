import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Footer} from '../FooterMenu/footer-menu.tsx';
import {useState} from 'react';
import {FishPage} from '../FishPage/fish-page.tsx';
import {MainComponent} from './main-component.tsx';
import {PlacesPage} from '../PlacesPage/places-page.tsx';
import {FishScreen} from '../FishScreen/fish-screen.tsx';
import {BoardPage} from '../BoardPage/board-page.tsx';
import {UserProfile} from '../Profile/user-profile.tsx';

export interface Fish {
  id: number;
  name: string;
  date: string;
  wt: string;
  at: string;
  fm: string;
  bait: string;
  weight: string;
  long: string;
}

export const Main = () => {
  const [page, setPage] = useState('home');
  const [fish, setFish] = useState<Fish[]>([]);
  const renderScreen = () => {
    switch (page) {
      case 'home':
        return <MainComponent setPage={setPage} />;
      case 'fish`s':
        return <FishScreen />;
      case 'fish':
        return <FishPage setPage={setPage} />;
      case 'places':
        return <PlacesPage />;
      case 'board':
        return <BoardPage />;
      case 'profile':
        return <UserProfile />;
      default:
        return <MainComponent setPage={setPage} />;
    }
  };
  return (
    <View>
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/loaderBg.png')}>
        {page === 'profile' ? null : (
          <Image
            style={styles.waves}
            // source={require('../../assets/images/header_waves.png')}
          />
        )}
        {renderScreen()}
        <SafeAreaView
          style={[
            styles.buttonScreen,
            (page === 'fish' || page === 'places') && {alignItems: 'center'},
          ]}>
          <View style={styles.footerContainer}>
            <Footer
              setFish={setFish}
              fish={fish}
              page={page}
              setPage={setPage}
            />
          </View>
          {page === 'profile' ? null : (
            <View>
              {page === 'fish' || page === 'places' ? (
                <Image
                  style={styles.maskGroupTwo}
                  source={require('../../assets/images/maskGroupTwo.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/maskGgroupOne.png')}
                />
              )}
            </View>
          )}
          <Image
            style={[styles.waves, styles.wavesTwo]}
            source={require('../../assets/images/dor_waves.png')}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waves: {
    width: '100%',
  },
  wavesTwo: {
    position: 'absolute',
  },
  maskGroupTwo: {
    top: -95,
  },
  buttonScreen: {
    width: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  footerContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 32,
    width: '100%',
    zIndex: 1,
  },
});
