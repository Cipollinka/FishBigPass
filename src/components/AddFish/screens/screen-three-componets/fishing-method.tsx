import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

interface FishingMethodProps {
  setSelectMethod: (value: ((prevState: string) => string) | string) => void;
  setSelect: (value: ((prevState: string) => string) | string) => void;
}

export const FishingMethod = ({
  setSelectMethod,
  setSelect,
}: FishingMethodProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    'Fishing rod',
    'Hands',
    'Spinning',
    'Fish net',
    'Float',
    'Feeder',
    'Trolling',
    'Jigging',
    'Baubles',
    'Jig',
    'Ice fishing',
    'Somkom',
    'Other',
  ];

  const handleOptionMethod = (option: string) => {
    setSelectMethod(option);
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
              handleOptionMethod(option);
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
