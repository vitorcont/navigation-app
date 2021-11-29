import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppContent from './AppContent'
import Login from './src/screens/Login/Login'

export default function App() {
    return (
        <View style={styles.container}>
            <Login />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8d8d8d',
    },
})
