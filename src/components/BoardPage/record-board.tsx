import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export const RecordBoard = () => {
  return (
    <View style={styles.container}>
      {/* Рядок 1 */}
      <View style={styles.recordItem}>
        <Image
          // source={{uri: 'https://via.placeholder.com/100'}} // Замінити на зображення риби
          style={styles.recordImage}
        />
        <View style={styles.recordTextContainer}>
          <Text style={styles.recordTitle}>Carp</Text>
          <Text style={styles.recordSubtitle}>Biggest fish ever</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See more...</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Рядок 2 */}
      <View style={styles.recordItem}>
        <Image
          // source={{uri: 'https://via.placeholder.com/100'}} // Замінити на зображення локації
          style={styles.recordImage}
        />
        <View style={styles.recordTextContainer}>
          <Text style={styles.recordTitle}>Location name</Text>
          <Text style={styles.recordSubtitle}>
            The most fish are caught here: 35
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See more...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    // backgroundColor: '#0A0E45',
  },
  recordItem: {
    flexDirection: 'row',
    backgroundColor: '#1C1F67',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  recordImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  recordTextContainer: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  recordSubtitle: {
    fontSize: 14,
    color: '#BBB',
    marginVertical: 5,
  },
  seeMoreText: {
    fontSize: 14,
    color: '#4A56E2',
    fontWeight: 'bold',
  },
});
