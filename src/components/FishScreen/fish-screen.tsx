import {StyleSheet, Text, View} from 'react-native';
import {Followed} from '../FishPage/MostFollowed/most-followed.tsx';
import {UserRecipes} from '../FishPage/RecipesFromMyFishes/user-recipes.tsx';

export const FishScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <Followed />
      <UserRecipes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Забезпечує розтягування на весь екран
    flexDirection: 'column', // Розташування дочірніх елементів у стовпчик
    paddingLeft: 50,
    top: -50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: 'rgba(255, 255, 255, 1)',
  },
});
