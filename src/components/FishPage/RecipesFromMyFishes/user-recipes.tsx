import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ScreenName,
  useNavigation,
} from '../../../user/lib/hooks/use-navigation.tsx';
import {useUser} from '../../../user';

export const UserRecipes = () => {
  const {user} = useUser();
  const navigation = useNavigation();
  const handleScreenAddRecipes = () => {
    navigation.navigate(ScreenName.AddRecipes);
  };
  console.log('recipes', user?.recipes);
  const recipes = user?.recipes || [];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes from my fishes</Text>
      <View style={styles.cardContainer}>
        <Text style={styles.message}>
          You don't have{'\n'}your own{'\n'}created{'\n'}recipes yet
        </Text>
        {recipes.length > 0 &&
          recipes.map((item, index) => (
            <TouchableOpacity key={index} style={styles.recipeCard}>
              <Image source={{uri: item.selectedImage}} />
              <Text style={styles.recipeTitle}>{item.selectedFishes}</Text>
              <SafeAreaView style={styles.recipeDetailsContainer}>
                <View
                  style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/images/icons/greey_ellipse.png')}
                  />
                  <Text style={styles.recipeDetails}>{item.difficulty}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/images/icons/cloc_icon.png')}
                  />
                  <Text style={styles.recipeDetails}>
                    {item.cookingTime}
                  </Text>
                </View>
              </SafeAreaView>
            </TouchableOpacity>
          ))}
        <TouchableOpacity onPress={handleScreenAddRecipes} style={styles.card}>
          <Image
            source={require('../../../assets/images/icons/add_icon_recipes.png')}
          />
          <Text style={styles.cardText}>Add the first recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: 'rgba(247, 247, 247, 0.1)',
    borderRadius: 12,
    padding: 16,
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  message: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(8, 20, 82, 1)', // Темний синій фон картки
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 5,
    width: 126,
    height: 182,
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  recipeCard: {
    backgroundColor: 'rgba(8, 20, 82, 1)',
    borderRadius: 8,
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
    width: 126, // Фіксована ширина для елементів
    height: 182,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Тінь для Android
  },
  recipeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 2,
    left: -12,
  },
  recipeDetailsContainer: {
    width: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeDetails: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 1)',
  },
});
