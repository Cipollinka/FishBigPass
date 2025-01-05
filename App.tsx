import React from 'react';
import {Loader} from './src/components/LoaderScreen/loader_screen_page.tsx';
import {createStackNavigator} from '@react-navigation/stack';
import {UserProvider} from './src/user/Provider/UserProvider.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from './src/components/Main/main-screen.tsx';
import {AddFishMain} from './src/components/AddFish/add-fish-main.tsx';
import {ScreenOneAddPlaces} from './src/components/PlacesPage/screens/screen-one-add-places.tsx';
import {FishScreen} from './src/components/FishScreen/fish-screen.tsx';
import {DetailsFollowed} from './src/components/FishPage/MostFollowed/details-followed.tsx';
import {ScreenOneAddRecipes} from './src/components/FishPage/RecipesFromMyFishes/screens-add-recipes/screen-one-add-recipes.tsx';
import {EditProfile} from './src/components/Profile/edit-profile.tsx';
import {DetailsFish} from './src/components/AddFish/screens/screen-three-componets/DetailFish/details-fish-screen.tsx';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}
          initialRouteName="Loader">
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="AddFish" component={AddFishMain} />
          <Stack.Screen name="AddPlaces" component={ScreenOneAddPlaces} />
          <Stack.Screen name="Fish" component={FishScreen} />
          <Stack.Screen name="AddRecipes" component={ScreenOneAddRecipes} />
          <Stack.Screen name="DetailsFollowed" component={DetailsFollowed} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="FishDetails" component={DetailsFish} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
