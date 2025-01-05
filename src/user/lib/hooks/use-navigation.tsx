import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
} from '@react-navigation/native';

export enum ScreenName {
  Loader = 'Loader',
  Main = 'Main',
  AddFish = 'AddFish',
  AddPlaces = 'AddPlaces',
  Fish = 'Fish',
  AddRecipes = 'AddRecipes',
  DetailsFollowed = 'DetailsFollowed',
  EditProfile = 'EditProfile',
  FishDetails = 'FishDetails',
}
export const useNavigation = () => {
  const {dispatch} = useStackNavigation();

  const currentScreen = useNavigationState(state =>
    state?.routes ? state.routes[state.index].name : '',
  );

  const navigate = (screen: ScreenName, params?: Record<string, any>) => {
    if (currentScreen === screen) {
      return;
    }
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen, params}],
      }),
    );
  };
  return {navigate, currentScreen};
};
