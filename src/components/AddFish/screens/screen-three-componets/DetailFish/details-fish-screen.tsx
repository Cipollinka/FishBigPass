import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useUser} from '../../../../../user';
import {
  ScreenName,
  useNavigation,
} from '../../../../../user/lib/hooks/use-navigation.tsx';

type FishDetailsParams = {
  FishDetails: {
    details: {
      fishName: string;
      fishData: string;
      photo: string;
      waterTemperature: number;
      airTemperature: number;
      method: string;
      bait: string;
      weight: number;
      length: string;
    };
  };
};

export const DetailsFish = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<FishDetailsParams, 'FishDetails'>>();
  const {details} = route.params; // Correct access to the details object

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${details.fishName}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedFishList = user?.fish.filter(
              fish => fish.fishName !== details.fishName,
            );
            saveUser({...user, fish: updatedFishList});
          },
        },
      ],
    );
    navigation.navigate(ScreenName.Main);
  };

  const handleBack = () => {
    navigation.navigate(ScreenName.Main);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{details.fishName}</Text>
          <Image source={{uri: details.photo}} style={styles.image} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Name of the fish</Text>
              <Text style={styles.value}>{details.fishName}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Fishing date</Text>
              <Text style={styles.value}>{details.fishData}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Water temperature (°C)</Text>
              <Text style={styles.value}>{details.waterTemperature}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Air temperature (°C)</Text>
              <Text style={styles.value}>{details.airTemperature}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Fishing method</Text>
              <Text style={styles.value}>{details.method}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Bait</Text>
              <Text style={styles.value}>{details.bait}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Weight (kg)</Text>
              <Text style={styles.value}>{details.weight}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={styles.label}>Long</Text>
              <Text style={styles.value}>{details.length}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001b57',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#003080',
    borderRadius: 10,
    padding: 15,
  },
  detailBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
