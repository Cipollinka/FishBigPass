import {createContext, useContext, useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import {AppState} from 'react-native';

export const useBackgroundMusic = () => {
  const [sound, setBackgroundMusic] = useState<Sound | null>(null);
  const [volume, setVolume] = useState(1);
  const [vibro, setVibro] = useState(4);

  useEffect(() => {
    Sound.setCategory('Playback');
    const backgroundMusic = new Sound(
      'bgmusic.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        backgroundMusic.play();
        backgroundMusic.setNumberOfLoops(-1);
        setBackgroundMusic(backgroundMusic);
      },
    );

    // Handle app state changes
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background') {
        // Pause playback when the app goes to the background
        backgroundMusic.pause();
      } else if (nextAppState === 'active') {
        // Resume playback when the app comes back to the foreground
        backgroundMusic.play();
      }
    };

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateSubscription.remove();
      backgroundMusic.release();
    };
  }, []);

  const onVolumeChange = (value: number) => {
    setVolume(prevState => {
      if (!sound || value > 1) {
        return prevState;
      }
      sound.setVolume(value);
      return value;
    });
  };

  const increaseVolume = () => {
    setVolume(prevState => {
      if (!sound) {
        return prevState;
      }
      const newVolume = parseFloat(Math.min(prevState + 0.1, 1.0).toFixed(6));

      sound.setVolume(newVolume);
      return newVolume;
    });
  };

  const decreaseVolume = () => {
    if (!sound) {
      return;
    }
    setVolume(prevState => {
      if (!sound) {
        return prevState;
      }
      const newVolume = parseFloat(Math.max(prevState - 0.1, 0.0).toFixed(6));
      sound.setVolume(newVolume);
      return newVolume;
    });
  };

  return {
    onVolumeChange,
    increaseVolume,
    decreaseVolume,
    volume,
    setVibro,
    vibro,
  };
};

interface BackgroundMusicContextProps {
  onVolumeChange: (value: number) => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  volume: number;
  vibro: number;
  setVibro: (value: number) => void;
}

export const BackgroundMusicContext = createContext<
  BackgroundMusicContextProps | undefined
>(undefined);

export const useHandleBackgroundMusic = () => {
  const context = useContext(BackgroundMusicContext);

  if (!context) {
    throw new Error(
      'useBackgroundMusic must be used within a NavigationProvider',
    );
  }

  return context;
};
