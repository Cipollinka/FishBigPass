import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PanResponder,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FishingMethod} from './screen-three-componets/fishing-method.tsx';
import {FishingBait} from './screen-three-componets/fishing-bait.tsx';

const CustomSlider = ({
  label,
  min,
  max,
  step,
  value,
  setValue,
  unit,
  color, // Додано параметр для кольору
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  setValue: (val: number) => void;
  unit: string;
  color: string; // Приймаємо колір як параметр
}) => {
  const sliderWidth = 300;

  const handleMove = (_: any, gestureState: {dx: number}) => {
    let newValue = value + (gestureState.dx / sliderWidth) * (max - min);
    newValue = Math.max(min, Math.min(max, Math.round(newValue / step) * step));
    setValue(newValue);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handleMove,
    onPanResponderRelease: () => {},
  });

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <View style={styles.slider}>
        <View
          style={[
            styles.sliderTrack,
            {
              width: `${((value - min) / (max - min)) * 100}%`,
              backgroundColor: color,
            }, // Використовуємо колір
          ]}
        />
        <View
          style={[
            styles.thumb,
            {left: `${((value - min) / (max - min)) * 100}%`},
          ]}
          {...panResponder.panHandlers}>
          <Text
            style={{
              fontSize: 12,
              color: 'rgba(12, 91, 181, 1)',
              fontWeight: '500',
            }}>
            {value} {unit}
          </Text>
        </View>
      </View>
    </View>
  );
};

interface ScreenThreeProps {}

interface ScreenThreeProps {
  setFishData: (value: ((prevState: string) => string) | string) => void;
  setWaterTemperature: (
    value: ((prevState: string) => string) | string,
  ) => void;
  setAirTemperature: (value: ((prevState: number) => number) | number) => void;
  setWeight: (value: ((prevState: number) => number) | number) => void;
  setLength: (value: ((prevState: number) => number) | number) => void;
  setDescriptionFish: (value: ((prevState: string) => string) | string) => void;
  setMethod: (value: ((prevState: string) => string) | string) => void;
  setBait: (value: ((prevState: string) => string) | string) => void;
}

export const ScreenThree = ({
  setFishData,
  setWaterTemperature,
  setAirTemperature,
  setWeight,
  setLength,
  setDescriptionFish,
  setMethod,
  setBait,
}: ScreenThreeProps) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [waterTemp, setWaterTemp] = useState('20');
  const [airTemp, setAirTemp] = useState(10);
  const [fishWeight, setFishWeight] = useState(5);
  const [fishLength, setFishLength] = useState(1);
  const [description, setDescription] = useState('');
  const [select, setSelect] = useState('screen');
  const [selectBait, setSelectBait] = useState('');
  const [selectMethod, setSelectMethod] = useState('');

  console.log('Date', date);

  const handleBait = (name: string) => {
    setSelect(name);
  };
  const handleFishingMethod = (name: string) => {
    setSelect(name);
  };

  if (select === 'method') {
    return (
      <FishingMethod setSelect={setSelect} setSelectMethod={setSelectMethod} />
    );
  } else if (select === 'bait') {
    return <FishingBait setSelect={setSelect} setSelectBait={setSelectBait} />;
  }

  const handleSave = () => {
    setLength(fishLength);
    setWeight(fishWeight);
    setFishData(date.toLocaleDateString());
    setAirTemperature(airTemp);
    setDescriptionFish(description);
    setWaterTemperature(waterTemp);
    setMethod(selectMethod);
    setBait(selectBait);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Fish</Text>
      <Text style={styles.subHeader}>Weather conditions</Text>

      {/* Fishing Date */}
      <Text style={styles.label}>Fishing date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            setDate(selectedDate || date);
          }}
        />
      )}

      {/* Water Temperature */}
      <Text style={styles.label}>Water temperature (°C)</Text>
      <TextInput
        style={[styles.input, styles.textInput]}
        placeholder="Enter temperature"
        keyboardType="numeric"
        value={waterTemp}
        onChangeText={setWaterTemp}
      />

      {/* Custom Sliders */}
      <CustomSlider
        label="Air temperature"
        min={-40}
        max={40}
        step={1}
        value={airTemp}
        setValue={setAirTemp}
        unit="°"
        color="rgba(12, 91, 181, 1)" // Колір для цього слайдера
      />
      <CustomSlider
        label="Weight of fish"
        min={0}
        max={20}
        step={1}
        value={fishWeight}
        setValue={setFishWeight}
        unit="kg"
        color="rgba(139, 181, 12, 1)" // Колір для цього слайдера
      />
      <CustomSlider
        label="Fish length"
        min={0}
        max={2}
        step={0.1}
        value={fishLength}
        setValue={setFishLength}
        unit="m"
        color="rgba(210, 163, 43, 1)" // Колір для цього слайдера
      />

      {/* Dropdowns */}
      <Text style={styles.label}>Fishing method</Text>
      <TouchableOpacity
        onPress={() => handleFishingMethod('method')}
        style={styles.dropdown}>
        <Text style={{color: 'rgba(255, 255, 255, 1)'}}>Select</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Bait</Text>
      <TouchableOpacity
        onPress={() => handleBait('bait')}
        style={styles.dropdown}>
        <Text style={{color: 'rgba(255, 255, 255, 1)'}}>Select</Text>
      </TouchableOpacity>

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter description"
        placeholderTextColor="rgba(255, 255, 255, 1)"
        multiline
        numberOfLines={15}
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity
        onPress={handleSave}
        style={{
          marginBottom: 100,
          width: 250,
          height: 50,
          borderRadius: 12,
          backgroundColor: 'rgba(19, 10, 119, 1)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    color: '#AAA',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12, 91, 181, 1)',
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
  },
  inputText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  sliderContainer: {
    marginVertical: 15,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  slider: {
    width: 300,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 1)',
    position: 'relative',
  },
  sliderTrack: {
    height: '100%',
    borderRadius: 10,
  },
  thumb: {
    position: 'absolute',
    top: -5,
    marginLeft: -10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    backgroundColor: 'white',
  },
  dropdown: {
    backgroundColor: 'rgba(12, 91, 181, 1)',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  textArea: {
    backgroundColor: 'rgba(12, 91, 181, 1)',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginBottom: 50,
    textAlignVertical: 'top',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  textInput: {
    padding: 15,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '400',
    fontSize: 20,
  },
});
