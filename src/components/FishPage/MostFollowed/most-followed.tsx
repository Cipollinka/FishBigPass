import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import recipesFollowed from '../../../user/big_bass_recipes.json';
import {
  ScreenName,
  useNavigation,
} from '../../../user/lib/hooks/use-navigation.tsx';

export const Followed = () => {
  const navigation = useNavigation();
  const handleDetails = (details: any) => {
    navigation.navigate(ScreenName.DetailsFollowed, {details});
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Most followed</Text>
      <SafeAreaView
        style={{
          backgroundColor: 'rgba(247, 247, 247, 0.1)',
          borderRadius: 12,
          height: 190,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 8,
          paddingRight: 8,
          gap: 10,
        }}>
        <ScrollView
          horizontal={true} // Включаємо горизонтальний скрол
          showsHorizontalScrollIndicator={false} // Показуємо індикатор горизонтального скролу
        >
          {recipesFollowed.map(recipe => (
            <TouchableOpacity
              onPress={() => handleDetails(recipe)}
              key={recipe.recipe_id}
              style={styles.recipeCard}>
              <Image
                source={require('../../../assets/images/icons/fish_icon_list.png')}
              />
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <SafeAreaView style={styles.recipeDetailsContainer}>
                <View
                  style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/images/icons/greey_ellipse.png')}
                  />
                  <Text style={styles.recipeDetails}>{recipe.difficulty}</Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/images/icons/cloc_icon.png')}
                  />
                  <Text style={styles.recipeDetails}>
                    {recipe.preparation_time} min
                  </Text>
                </View>
              </SafeAreaView>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1,
    padding: 10,
    height: 182,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgba(255, 255, 255, 1)',
  },
  recipeCard: {
    backgroundColor: 'rgba(8, 20, 82, 1)',
    borderRadius: 8,
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
    width: 126, // Фіксована ширина для елементів
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
