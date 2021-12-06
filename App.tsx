import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppContent from './AppContent'

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import {
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
} from '@expo-google-fonts/inter'

export default function App() {
    let [fontsloaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
    })

    if (!fontsloaded) return <AppLoading />

    return (
        <View style={styles.container}>
            <AppContent />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8d8d8d',
    },
})
