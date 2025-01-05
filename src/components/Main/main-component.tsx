import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface MainComponentProps {
  setPage: (value: ((prevState: string) => string) | string) => void;
}

export const MainComponent = ({setPage}: MainComponentProps) => {
  return (
    <SafeAreaView style={styles.button_screen_container}>
      <TouchableOpacity onPress={() => setPage('fish')} style={styles.button_screen}>
        <Image source={require('../../assets/images/fish_page_image.png')} />
        <Text
          style={{
            marginLeft: 20,
            marginBottom: -10,
            fontWeight: '500',
            fontSize: 20,
            color: 'rgba(255, 255, 255, 1)',
          }}>
          Fish
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage('places')} style={styles.button_screen}>
        <Image source={require('../../assets/images/places_image_page.png')} />
        <Text
          style={{
            marginLeft: 20,
            marginBottom: -10,
            fontWeight: '500',
            fontSize: 20,
            color: 'rgba(255, 255, 255, 1)',
          }}>
          Places
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button_screen_container: {
    position: 'absolute',
    bottom: '25%',
    zIndex: 1,
    gap: 20,
  },
  button_screen: {
    width: 328,
    backgroundColor: 'rgba(19, 10, 119, 1)',
    borderRadius: 16,
    borderWidth: 1,
    paddingBottom: 20,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
});
