import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {RecordBoard} from './record-board.tsx';
import {AchievementBoard} from './achievement-board.tsx';

export const BoardPage = () => {
  const [activeTab, setActiveTab] = useState('Record'); // Стан для відстеження активної вкладки

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.header}>Board</Text>

      {/* Вкладки */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[activeTab === 'Record' && styles.activeTab]}
          onPress={() => setActiveTab('Record')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Record' && styles.activeText,
            ]}>
            Record{'\n'}board
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[activeTab === 'Achievement' && styles.activeTab]}
          onPress={() => setActiveTab('Achievement')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Achievement' && styles.activeText,
            ]}>
            Achievement{'\n'}board
          </Text>
        </TouchableOpacity>
      </View>

      {/* Контент вкладок */}
      <View style={styles.content}>
        {activeTab === 'Record' ? <RecordBoard /> : <AchievementBoard />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    height: 350,
  },
  header: {
    fontSize: 42,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 100,
    marginBottom: 20,
  },
  // tabButton: {
  //   alignItems: 'center',
  //   paddingVertical: 10,
  //   backgroundColor: '#1C1F67',
  //   marginHorizontal: 5,
  //   borderRadius: 10,
  // },
  activeTab: {
    color: '#4A56E2',
  },
  tabText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});
