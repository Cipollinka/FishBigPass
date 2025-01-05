import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

interface ScreenThreeAddRecipesProps {
  selectedImage: string | null;
  setSelectedImage: (
    value: ((prevState: string | null) => string | null) | string | null,
  ) => void;
}

export const ScreenThreeAddRecipes = ({
  selectedImage,
  setSelectedImage,
}: ScreenThreeAddRecipesProps) => {
  // Функція для вибору фото
  const handleAddPhoto = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log('No image selected');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a cover photo for the recipe</Text>
      <TouchableOpacity style={styles.imageButton} onPress={handleAddPhoto}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.imagePreview} />
        ) : (
          <Image
            source={require('../../../../assets/images/image_fish_download.png')}
            style={styles.imagePlaceholder}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageButton: {
    borderRadius: 138,
    overflow: 'hidden',
    width: 200,
    height: 200,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
