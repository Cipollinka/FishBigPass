import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface ScreenOneProps {
  setFishCond: (value: ((prevState: string) => string) | string) => void;
}

export const ScreenOne = ({setFishCond}: ScreenOneProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Sunny', 'Windy', 'Rainy', 'Heat', 'Snow'];

  const handleOption = (option: string) => {
    setFishCond(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add fish</Text>
      <Text style={styles.subtitle}>Weather conditions</Text>

      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionContainer,
            selectedOption === option && styles.optionSelected,
          ]}
          onPress={() => {
            setSelectedOption(option);
            handleOption(option);
          }}>
          <Text style={styles.optionText}>{option}</Text>
          <View
            style={[
              styles.radioCircle,
              selectedOption === option && styles.radioCircleSelected,
            ]}
          />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#C3DFFF',
    marginBottom: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0054CC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: '#004299',
  },
  optionText: {
    color: '#FFF',
    fontSize: 18,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  radioCircleSelected: {
    backgroundColor: '#C3DFFF',
  },
});
