import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../user';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {Fish} from '../AddFish/add-fish-main.tsx';

interface FishPageProps {
  setPage: (value: ((prevState: string) => string) | string) => void;
}

export const FishPage = ({setPage}: FishPageProps) => {
  const {user} = useUser();
  const navigation = useNavigation();
  const handleNextDetailsFish = (details: Fish[]) => {
    navigation.navigate(ScreenName.FishDetails, {details});
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.button_back}
        onPress={() => setPage('main')}>
        <Image source={require('../../assets/images/icons/chevron_left.png')} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Fish</Text>

      <View style={{height: 450, width: '100%'}}>
        {user?.fish.length === 0 ? (
          <Image
            style={styles.defaultImage}
            source={require('../../assets/images/FishJar.png')}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.fishContainer}>
              {user?.fish.map((item, index) => (
                <View style={styles.fishCard} key={index}>
                  {item.photo && (
                    <Image
                      source={{uri: item.photo}}
                      style={styles.fishImage}
                    />
                  )}
                  <Text style={styles.fishName}>{item.fishName}</Text>
                  <Text style={styles.fishData}>{item.fishData}</Text>
                  <TouchableOpacity onPress={() => handleNextDetailsFish(item)}>
                    <Text style={{color: 'rgba(44, 142, 232, 1)'}}>
                      See more
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -20,
    alignItems: 'flex-start',
    zIndex: 1,
  },
  button_back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  backText: {
    fontSize: 17,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  title: {
    fontSize: 42,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },
  defaultImage: {
    width: 112,
    height: 152,
    zIndex: 1,
    alignSelf: 'center',
  },
  fishContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  fishCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 145,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  fishImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  fishName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
  },
  fishData: {
    fontSize: 14,
    color: 'rgba(187, 187, 187, 1)',
  },
});
