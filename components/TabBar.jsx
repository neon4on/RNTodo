import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

function TabBar({activeTab, setActiveTab}) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'tasks' && styles.activeTab]}
        onPress={() => setActiveTab('tasks')}>
        <Text style={styles.tabText}>Задачи</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'registration' && styles.activeTab]}
        onPress={() => setActiveTab('registration')}>
        <Text style={styles.tabText}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TabBar;
