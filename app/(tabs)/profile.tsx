import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [morningOrbit, setMorningOrbit] = useState(true);
  const [urduInterface, setUrduInterface] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Text style={styles.headerTitle}>Profile</Text> */}

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AQ</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ahmad Qureshi</Text>
            <Text style={styles.userSubtext}>4-day streak · 280 Star Dust</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Level 3 — Rising Star</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionLabel}>SETTINGS</Text>
        <View style={styles.cardGroup}>
          <SettingItem label="Notification time" value="6:00 AM" />
          <SettingItem label="Language" value="English" />
          <SettingItem label="Focus areas" value="3 selected" />
          <SettingItem label="Change bot" value="The Coach" isLast />
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
        <View style={styles.cardGroup}>
          <View style={styles.settingRow}>
            <Text style={styles.rowLabel}>Morning orbit</Text>
            <Switch 
              value={morningOrbit} 
              onValueChange={setMorningOrbit}
              trackColor={{ false: "#e9e9eb", true: "#4a86f7" }}
            />
          </View>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.rowLabel}>Urdu interface</Text>
            <Switch 
              value={urduInterface} 
              onValueChange={setUrduInterface}
              trackColor={{ false: "#e9e9eb", true: "#4a86f7" }}
            />
          </View>
        </View>

        {/* Upgrade Button */}
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeText}>Upgrade to Pro — PKR 499/month</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable component for the clickable rows
const SettingItem = ({ label, value, isLast }: { label: string, value: string, isLast?: boolean }) => (
  <TouchableOpacity style={[styles.settingRow, isLast && { borderBottomWidth: 0 }]}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowRight}>
      <Text style={styles.rowValue}>{value}</Text>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </View>
  </TouchableOpacity>
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
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fb',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  userSubtext: {
    fontSize: 13,
    color: '#94a3b8',
    marginVertical: 2,
  },
  badge: {
    backgroundColor: '#fffbeb',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#b45309',
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  cardGroup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 25,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rowLabel: {
    fontSize: 15,
    color: '#334155',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowValue: {
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 4,
  },
  upgradeButton: {
    backgroundColor: '#eff6ff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  upgradeText: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 15,
  },
});