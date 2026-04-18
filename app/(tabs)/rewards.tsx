import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function RewardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Text style={styles.headerTitle}>Rewards</Text> */}

        {/* Star Dust Main Card */}
        <View style={styles.rewardCard}>
          <Text style={styles.pointsText}>280</Text>
          <Text style={styles.pointsLabel}>Star Dust</Text>
          
          <Text style={styles.levelText}>Level 3 — Rising Star</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '60%' }]} />
          </View>
          
          <Text style={styles.progressSubtext}>20 more to Fixed Star</Text>
        </View>

        {/* Earn Section */}
        <Text style={styles.sectionLabel}>EARN STAR DUST</Text>
        
        <View style={styles.taskContainer}>
          <TaskItem title="Open Daily Orbit" points="+5" badgeColor="#eff6ff" textColor="#2563eb" />
          <TaskItem title="Chat with bot" points="+10" badgeColor="#f0fdf4" textColor="#16a34a" />
          <TaskItem title="Complete action of the day" points="+20" badgeColor="#fff7ed" textColor="#ea580c" />
          <TaskItem title="Evaluate an idea" points="+15" badgeColor="#f5f3ff" textColor="#7c3aed" />
          <TaskItem title="Refer a friend" points="+50" badgeColor="#fffbeb" textColor="#b45309" isLast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const TaskItem = ({ title, points, badgeColor, textColor, isLast }: any) => (
  <View style={[styles.taskRow, isLast && { borderBottomWidth: 0 }]}>
    <Text style={styles.taskTitle}>{title}</Text>
    <View style={[styles.pointBadge, { backgroundColor: badgeColor }]}>
      <Text style={[styles.pointText, { color: textColor }]}>{points}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    color: '#000',
  },
  rewardCard: {
    backgroundColor: '#fffdf0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fef3c7',
    padding: 24,
    alignItems: 'center',
    marginBottom: 30,
  },
  pointsText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#a16207',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#a16207',
    fontWeight: '600',
    marginBottom: 15,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#b45309',
    marginBottom: 10,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#fef3c7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#d97706',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 12,
    color: '#b45309',
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  taskContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    overflow: 'hidden',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  taskTitle: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  pointBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointText: {
    fontSize: 14,
    fontWeight: '700',
  },
});