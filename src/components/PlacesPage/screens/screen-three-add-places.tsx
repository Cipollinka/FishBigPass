import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUser} from '../../../user';

export interface Fish {
  fishName: string;
  fishData: string;
  photo?: string;
}

interface ScreenThreeAddPlacesProps {
  setPlacesFish?: (value: ((prevState: Fish[]) => Fish[]) | Fish[]) => void;
}

export const ScreenThreeAddPlaces = ({
  setPlacesFish,
}: ScreenThreeAddPlacesProps) => {
  const {user} = useUser();
  const fish = user?.fish || [];

  // Стан для вибраних риб
  const [selectedFish, setSelectedFish] = useState<Fish[]>([]);

  const toggleFishSelection = (fishItem: Fish) => {
    setSelectedFish(
      prev =>
        prev.find(selected => selected.fishName === fishItem.fishName)
          ? prev.filter(selected => selected.fishName !== fishItem.fishName) // Видаляємо, якщо вже вибрано
          : [...prev, fishItem], // Додаємо, якщо ще не вибрано
    );
  };

  const handleAddFish = () => {
    if (setPlacesFish) {
      setPlacesFish(prevState => [...(prevState || []), ...selectedFish]);
      setSelectedFish([]); // Очищуємо вибір після додавання
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          left: -50,
          fontSize: 42,
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 1)',
        }}>
        Add fish you{'\n'}caught at this{'\n'}location
      </Text>
      {fish.length === 0 ? (
        <Image
          style={{width: 112, height: 152}}
          source={require('../../../assets/images/FishJar.png')}
        />
      ) : (
        <View style={{height: 300}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.fishContainer}>
              {fish.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.fishCard,
                    selectedFish.some(
                      selected => selected.fishName === item.fishName,
                    ) && styles.selectedFishCard,
                  ]}
                  onPress={() => toggleFishSelection(item)}>
                  {item.photo && (
                    <Image
                      source={{uri: item.photo}}
                      style={styles.fishImage}
                    />
                  )}
                  <Text style={styles.fishName}>{item.fishName}</Text>
                  <Text style={styles.fishData}>{item.fishData}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
      <TouchableOpacity onPress={handleAddFish}>
        <Image source={require('../../../assets/images/add_fish.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
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
    width: 100,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  selectedFishCard: {
    backgroundColor: 'rgba(44, 142, 232, 0.5)',
  },
  fishImage: {
    width: 40,
    height: 40,
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
