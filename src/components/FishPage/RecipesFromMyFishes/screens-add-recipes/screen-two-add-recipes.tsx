import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useUser} from '../../../../user';

interface ScreenTwoAddRecipesProps {
  selectedFishes: string[];
  setSelectedFishes: (
    value: ((prevState: string[]) => string[]) | string[],
  ) => void;
}

export const ScreenTwoAddRecipes = ({
  selectedFishes,
  setSelectedFishes,
}: ScreenTwoAddRecipesProps) => {
  const {user, saveUser} = useUser();

  // Дані про рибу
  const fishData =
    user?.fish?.filter(fish => fish.photo && fish.fishName) || [];

  // Обробка вибору риби
  const handleFishSelect = (id: string) => {
    setSelectedFishes(prevState =>
      prevState.includes(id)
        ? prevState.filter(fishId => fishId !== id)
        : [...prevState, id],
    );
  };

  // Обробка "See more"
  const handleSeeMore = (fish: {
    fishName: string;
    photo: string;
  }) => {
    // Логіка для відображення додаткової інформації про рибу
    console.log('See more:', fish);
  };

  // Збереження вибраних риб
  const saveSelection = async () => {
    try {
      console.log('Saving selected fishes:', selectedFishes);

      // Створюємо новий об'єкт стану для збереження
      const updatedFish = user?.fish.map(fish => ({
        ...fish,
        isSelected: selectedFishes.includes(fish.id), // Додаємо поле для вибору
      }));

      if (!updatedFish) {
        console.error('No fish to update');
        return;
      }

      // Виклик saveUser із відповідним об'єктом
      await saveUser({fish: updatedFish});
      console.log('Selected fishes saved successfully');
    } catch (error) {
      console.error('Error saving selected fishes:', error);
    }
  };

  // Рендеринг картки риби
  const renderFishCard = ({item}: {item: (typeof fishData)[0]}) => (
    <TouchableOpacity
      style={[
        styles.fishCard,
        selectedFishes.includes(item.fishName) && styles.selectedCard,
      ]}
      onPress={() => handleFishSelect(item.fishName)}>
      <Image source={{uri: item.photo}} style={styles.fishImage} />
      <Text style={styles.fishName}>{item.fishName}</Text>
      <TouchableOpacity onPress={() => handleSeeMore(item)}>
        <Text style={styles.seeMore}>See more</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Choose which fish your recipe will be made of
      </Text>
      {fishData.length > 0 ? (
        <FlatList
          data={fishData}
          renderItem={renderFishCard}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.fishList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noFishText}>No saved fish available</Text>
      )}
      <TouchableOpacity
        style={[
          styles.addButton,
          selectedFishes.length === 0 && styles.disabledButton,
        ]}
        onPress={saveSelection}
        disabled={selectedFishes.length === 0}>
        <Text style={styles.addButtonText}>Save Selection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  fishList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  fishCard: {
    width: 150,
    backgroundColor: '#1A1F71',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  selectedCard: {
    borderColor: '#00FF00',
    borderWidth: 2,
  },
  fishImage: {
    width: 100,
    height: 60,
    marginBottom: 10,
    borderRadius: 5,
  },
  fishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  seeMore: {
    fontSize: 14,
    color: '#4DA6FF',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#4DA6FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#888888',
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  noFishText: {
    fontSize: 18,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 20,
  },
});
