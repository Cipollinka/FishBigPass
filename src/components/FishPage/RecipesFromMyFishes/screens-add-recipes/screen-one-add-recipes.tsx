import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {ScreenTwoAddRecipes} from './screen-two-add-recipes.tsx';
import {
  ScreenName,
  useNavigation,
} from '../../../../user/lib/hooks/use-navigation.tsx';
import {ScreenThreeAddRecipes} from './screen-three-add-recipes.tsx';
import {useUser} from '../../../../user';

export const ScreenOneAddRecipes = () => {
  const {user, saveUser} = useUser();
  const navigation = useNavigation();
  const [fish, setFish] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedFishes, setSelectedFishes] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState('one');
  const renderScreen = () => {
    switch (page) {
      case 'one':
        return (
          <SafeAreaView>
            <Text style={styles.subtitle}>Create your own recipe</Text>

            <TextInput
              style={styles.input}
              value={fish}
              onChangeText={setFish}
              placeholderTextColor="#c0d6f3"
              placeholder="Select fish"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter recipe name"
              placeholderTextColor="#c0d6f3"
              value={recipeName}
              onChangeText={setRecipeName}
            />

            <TextInput
              style={styles.input}
              placeholder="Step by step instructions, recipe description"
              placeholderTextColor="#c0d6f3"
              multiline={true}
              value={description}
              onChangeText={setDescription}
              numberOfLines={7}
            />

            <TextInput
              style={styles.input}
              placeholder="30 min"
              placeholderTextColor="#c0d6f3"
              value={cookingTime}
              onChangeText={setCookingTime}
              keyboardType="numeric"
            />

            <Text style={styles.difficultyText}>Difficulty level</Text>
            <View style={styles.difficultyContainer}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'Easy' && styles.easy,
                ]}
                onPress={() => setDifficulty('Easy')}>
                <View style={[styles.circle, {backgroundColor: 'green'}]} />
                <Text style={styles.difficultyLabel}>Easy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'Medium' && styles.medium,
                ]}
                onPress={() => setDifficulty('Medium')}>
                <View style={[styles.circle, {backgroundColor: 'orange'}]} />
                <Text style={styles.difficultyLabel}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'Hard' && styles.hard,
                ]}
                onPress={() => setDifficulty('Hard')}>
                <View style={[styles.circle, {backgroundColor: 'red'}]} />
                <Text style={styles.difficultyLabel}>Hard</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        );
      case 'two':
        return (
          <ScreenTwoAddRecipes
            selectedFishes={selectedFishes}
            setSelectedFishes={setSelectedFishes}
          />
        );
      case 'three':
        return (
          <ScreenThreeAddRecipes
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        );
    }
  };
  const saveRecipe = () => {
    const newRecipe = {
      fish,
      recipeName,
      description,
      cookingTime,
      difficulty,
      selectedFishes,
      selectedImage,
    };

    // Перевірка чи вже є подібний рецепт у user, якщо ні, додаємо новий
    const updatedRecipes = user?.recipes
      ? [...user.recipes, newRecipe]
      : [newRecipe];

    // Збереження нового рецепту в user
    saveUser({...user, recipes: updatedRecipes});
  };

  const nextScreenRecipes = () => {
    if (page === 'one') {
      setPage('two');
    } else if (page === 'two') {
      setPage('three');
    } else if (page === 'three') {
      saveRecipe(); // Зберегти рецепт перед переходом на головну
      navigation.navigate(ScreenName.Main);
    }
  };
  const backScreenRecipes = () => {
    if (page === 'three') {
      setPage('two');
    } else if (page === 'two') {
      setPage('one');
    } else if (page === 'one') {
      navigation.navigate(ScreenName.Main);
    }
  };
  return (
    <View>
      <ImageBackground
        style={styles.bgImage}
        source={require('../../../../assets/images/bg_add_fish.png')}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={backScreenRecipes}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Add recipe</Text>
            <TouchableOpacity onPress={nextScreenRecipes}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
          {renderScreen()}
        </View>
        <Image
          style={{width: '100%'}}
          source={require('../../../../assets/images/dor_waves.png')}
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#c0d6f3',
    marginBottom: 20,
  },
  selectFishButton: {
    backgroundColor: '#194a8d',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#194a8d',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: '#fff',
  },
  difficultyText: {
    fontSize: 18,
    color: '#c0d6f3',
    marginBottom: 10,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  difficultyLabel: {
    color: '#fff',
    fontSize: 16,
  },
  easy: {
    borderColor: 'green',
  },
  medium: {
    borderColor: 'orange',
  },
  hard: {
    borderColor: 'red',
  },
});
