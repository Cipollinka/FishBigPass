import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from './components/Main/main-screen';
import {AddFishMain} from './components/AddFish/add-fish-main';
import {ScreenOneAddPlaces} from './components/PlacesPage/screens/screen-one-add-places';
import {FishScreen} from './components/FishScreen/fish-screen';
import {ScreenOneAddRecipes} from './components/FishPage/RecipesFromMyFishes/screens-add-recipes/screen-one-add-recipes';
import {DetailsFollowed} from './components/FishPage/MostFollowed/details-followed';
import {EditProfile} from './components/Profile/edit-profile';
import {DetailsFish} from './components/AddFish/screens/screen-three-componets/DetailFish/details-fish-screen';
import {UserProvider} from './user/Provider/UserProvider';
import {createStackNavigator} from '@react-navigation/stack';

export default function GameRoot() {
  const Stack = createStackNavigator();
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: false}}>
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
