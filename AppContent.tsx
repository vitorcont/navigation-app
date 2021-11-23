import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/NavigationStack';
import { navigationRef } from './src/services/navigation';

const AppContent = () => {
  return (
    <SafeAreaProvider>
      <StatusBar translucent />
      <NavigationContainer
        ref={navigationRef}
      >
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContent;