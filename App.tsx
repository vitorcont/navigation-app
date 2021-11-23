import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContent from './AppContent';

export default function App() {
  return (
    <View style={styles.container}>
      <AppContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8d8d8d'
  },
});
