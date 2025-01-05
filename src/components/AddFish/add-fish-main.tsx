import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {ScreenOne} from './screens/screen-one.tsx';
import {
  ScreenName,
  useNavigation,
} from '../../user/lib/hooks/use-navigation.tsx';
import {ScreenThree} from './screens/screen-three.tsx';
import {ScreenFour} from './screens/screen-four.tsx';
import {useUser} from '../../user';

export interface Fish {
  fishName: string;
  airTemperature: number;
  method: string;
  bait: string;
  length: number;
  waterTemperature: string;
  weight: number;
  description: string;
  photo: string;
  waterCond: string;
  fishData: string;
}

export const AddFishMain = () => {
  const {user, saveUser} = useUser();
  const [addFish, setAddFish] = useState<Fish[]>([]);
  const navigation = useNavigation();
  const [nextScreen, setNextScreen] = useState('one');
  const [fishName, setFishName] = useState<string>('');
  const [airTemperature, setAirTemperature] = useState<number>(0);
  const [method, setMethod] = useState<string>('');
  const [bait, setBait] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const [waterTemperature, setWaterTemperature] = useState<string>('0');
  const [weight, setWeight] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [waterCond, setWaterCond] = useState<string>('');
  const [fishData, setFishData] = useState<string>('');

  // Функція для рендеру відповідної сторінки
  const renderScreenAddFish = () => {
    switch (nextScreen) {
      case 'one':
        return <ScreenOne setFishCond={setWaterCond} />;
      // case 'two':
      //   return <ScreenTwo setFishData={setAddFish} />;
      case 'three':
        return (
          <ScreenThree
            setFishData={setFishData}
            setWaterTemperature={setWaterTemperature}
            setAirTemperature={setAirTemperature}
            setWeight={setWeight}
            setLength={setLength}
            setDescriptionFish={setDescription}
            setMethod={setMethod}
            setBait={setBait}
          />
        );
      case 'four':
        return <ScreenFour setFishName={setFishName} setPhoto={setPhoto} />;
    }
  };

  console.log('AddFish', description);

  // Функція для обробки натискання "Next"
  const handleNext = () => {
    if (nextScreen === 'four') {
      // Створення нового об'єкта риби
      const newFish: Fish = {
        fishName,
        airTemperature,
        method,
        bait,
        length,
        waterTemperature,
        weight,
        description,
        photo,
        waterCond,
        fishData,
      };

      // Додавання нової риби до списку
      const updatedFishList = user?.fish ? [...user.fish, newFish] : [newFish];

      // Збереження нового списку у useUser
      saveUser({
        ...user,
        fish: updatedFishList,
      });

      // Скидання локального стану, якщо потрібно
      setFishName('');
      setAirTemperature(0);
      setMethod('');
      setBait('');
      setLength(0);
      setWaterTemperature('');
      setWeight(0);
      setDescription('');
      setPhoto('');
      setWaterCond('');
      setFishData('');

      // Перехід до головного екрану
      navigation.navigate(ScreenName.Main);
    } else {
      if (nextScreen === 'one') {
        setNextScreen('three');
      } else if (nextScreen === 'three') {
        setNextScreen('four');
      } else if (nextScreen === 'four') {
        navigation.navigate(ScreenName.Main);
      }
    }
  };

  // Функція для обробки натискання "Back"
  const handleBack = () => {
    if (nextScreen === 'four') {
      setNextScreen('three');
    } else if (nextScreen === 'three') {
      setNextScreen('one');
    } else if (nextScreen === 'one') {
      navigation.navigate(ScreenName.Main);
    }
  };

  return (
    <View>
      <ImageBackground
        style={styles.imageBgMain}
        source={require('../../assets/images/bg_add_fish.png')}>
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.btnContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.btnBack}>
              <Image
                source={require('../../assets/images/icons/chevron_left.png')}
              />
              <Text style={{color: 'rgba(255, 255, 255, 1)'}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.btnNext}>
              <Text style={{color: 'rgba(255, 255, 255, 1)'}}>Next</Text>
            </TouchableOpacity>
          </SafeAreaView>
          {renderScreenAddFish()}
        </SafeAreaView>
        <Image
          style={{width: '100%'}}
          source={require('../../assets/images/bg_add_fish_footer.png')}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBgMain: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    gap: 8,
  },
  btnNext: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  btnContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    height: '85%',
  },
});
