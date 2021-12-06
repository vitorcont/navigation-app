import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/NavigationStack'
import { navigationRef } from './src/services/navigation'

const AppContent = () => {
    return (
        <SafeAreaProvider>
            <StatusBar translucent />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <NavigationContainer ref={navigationRef}>
                    <AppNavigator />
                </NavigationContainer>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    )
}

export default AppContent
