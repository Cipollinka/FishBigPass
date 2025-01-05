import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  ScreenName,
  useNavigation,
} from '../../../user/lib/hooks/use-navigation.tsx';

// Тип для параметрів маршруту
type DetailsFollowedRouteParams = {
  DetailsFollowed: {
    details: {
      title: string;
      difficulty: string;
      description: string;
      preparation_time: number;
    };
  };
};

export const DetailsFollowed = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<DetailsFollowedRouteParams, 'DetailsFollowed'>>();
  const {details} = route.params;

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  return (
    <View>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../../assets/images/bg_add_fish.png')}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.btnBack} onPress={handleBack}>
              <Image
                source={require('../../../assets/images/icons/chevron_left.png')}
              />
              <Text style={{color: 'rgba(255, 255, 255, 1)'}}>Back</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 42,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 1)',
              }}>
              Recipe
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 1)',
                width: 250,
              }}>
              {details.title}
            </Text>
            <SafeAreaView style={{flexDirection: 'row', gap: 20}}>
              <SafeAreaView
                style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/icons/greey_ellipse.png')}
                />
                <Text>{details.difficulty}</Text>
              </SafeAreaView>
              <SafeAreaView
                style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/icons/cloc_icon.png')}
                />
                <Text>{details.preparation_time} min</Text>
              </SafeAreaView>
            </SafeAreaView>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 1)',
              }}>
              {details.description}
            </Text>
          </View>
          <Image
            style={{
              width: '100%',
            }}
            source={require('../../../assets/images/dor_waves.png')}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  container: {
    marginTop: 49,
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 49,
    gap: 20,
  },
  btnBack: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
