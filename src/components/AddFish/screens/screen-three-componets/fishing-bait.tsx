import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface FishingBaitProps {
  setSelectBait: (value: ((prevState: string) => string) | string) => void;
  setSelect: (value: ((prevState: string) => string) | string) => void;
}

export const FishingBait = ({setSelectBait, setSelect}: FishingBaitProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    'Wobbler',
    'Worm',
    'Soft bait',
    'Fish net',
    'Baubles',
    'Jig',
    'Hook with an artificial front sight',
    'Spinner oscillator',
    'Silicone Bait',
    'Live bait',
    'Fly',
    'Crankbait',
    'Jig head',
    'Float tackle',
    'Other',
  ];

  const handleOptionBait = (option: string) => {
    setSelectBait(option);
    setSelect('screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add fish</Text>
      <Text style={styles.subtitle}>Weather conditions</Text>

      <ScrollView>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionContainer,
              selectedOption === option && styles.optionSelected,
            ]}
            onPress={() => {
              setSelectedOption(option);
              handleOptionBait(option);
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
      </ScrollView>
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
