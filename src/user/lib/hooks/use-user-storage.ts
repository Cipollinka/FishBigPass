import {useEffect, useState} from 'react';
import {User} from '../../types.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'user';
const initialUserState: User = {
  profile: {userName: '', photo: ''},
  fish: [],
  recipes: [],
  places: [],
};

export const useUserStorage = () => {
  const [user, setUserState] = useState<User>(initialUserState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadQuizState = async () => {
      try {
        setIsLoading(true);
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue) {
          setUserState(JSON.parse(jsonValue));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load user state from AsyncStorage', error);
      }
    };

    loadQuizState();
  }, []);

  const saveUser = async (newState: User) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log(
        'Збережено стан користувача в AsyncStorage',
        JSON.stringify(newState),
      );
      setUserState(newState);
    } catch (error) {
      console.error('Failed to save user state to AsyncStorage', error);
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUserState(initialUserState);
    } catch (error) {
      console.error('Failed to clear user state from AsyncStorage', error);
    }
  };
  const clearUserProgress = async () => {
    if (!user) {
      return;
    }
    await saveUser({
      ...user,
      profile: {userName: '', photo: ''},
      fish: [],
      recipes: [],
      places: [],
    });
  };

  return {
    user,
    isLoading,
    saveUser,
    clearUser,
    clearUserProgress,
  };
};
