import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

export const AchievementBoard = () => {
  const achievements = [
    {title: 'Catch 10 fish', progress: '30% done'},
    {title: 'Catch 50 fish', progress: '5% done'},
    {title: 'Catch 100 fish', progress: '2% done'},
    {title: 'Catch 100kg of fish', progress: '30% done'},
    {title: 'Create 10 recipes', progress: '10% done'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Current Achievements</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {achievements.map((item, index) => (
          <View key={index} style={styles.achievementItem}>
            <Text style={styles.achievementText}>{item.title}</Text>
            <Text style={styles.progressText}>{item.progress}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Completed Achievements</Text>
      <Text style={styles.noAchievementsText}>
        You haven't completed any of your achievements yet
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  achievementItem: {
    backgroundColor: '#1C1F67',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  achievementText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 5,
  },
  noAchievementsText: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 10,
  },
});
