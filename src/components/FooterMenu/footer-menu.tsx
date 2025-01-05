import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fish} from '../Main/main-screen.tsx';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';

interface FooterProps {
  setFish: (value: ((prevState: Fish[]) => Fish[]) | Fish[]) => void;
  fish: Fish[];
  page?: string;
  setPage: (value: ((prevState: string) => string) | string) => void;
}

export const Footer = ({setFish, fish, page, setPage}: FooterProps) => {
  const navigation = useNavigation();
  const AddFish = () => {
    navigation.navigate(ScreenName.AddFish, fish);
  };
  const AddPlaces = () => {
    navigation.navigate(ScreenName.AddPlaces);
  };
  const handleNavigate = (screen: string) => {
    setPage(screen);
  };
  return (
    <View style={styles.container}>
      {page === 'fish' || page === 'places' ? (
        <TouchableOpacity onPress={page === 'fish' ? AddFish : AddPlaces}>
          <Image source={require('../../assets/images/add_fish.png')} />
        </TouchableOpacity>
      ) : null}
      <SafeAreaView style={styles.container_footer}>
        <TouchableOpacity onPress={() => handleNavigate('home')}>
          <Image
            source={require('../../assets/images/icons/home_not_ctive.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('fish`s')}>
          <Image
            source={require('../../assets/images/icons/fish_not_ctive.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('board')}>
          <Image
            source={require('../../assets/images/icons/router_not_ctive.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('profile')}>
          <Image
            source={require('../../assets/images/icons/profile_not_ctive.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    gap: 20,
  },
  container_footer: {
    width: 332,
    height: 64,
    borderRadius: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: 'rgba(19, 10, 119, 1)',
  },
});
