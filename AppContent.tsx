import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator, ContentNavigator, StartNavigator } from './src/NavigationStack'
import { navigationRef } from './src/services/navigation'
import firebase from 'firebase'
import { useAuth } from './src/Hooks/auth'
import { UserProps } from './src/types'

const AppContent = () => {
    const { user, setUser } = useAuth()

    const loadUser = async () => {
        let firebaseUser = firebase.auth().currentUser
        if (firebaseUser)
            await firebase
                .firestore()
                .collection('Usuários')
                .doc(firebaseUser.uid)
                .get()
                .then((doc) => {
                    if (doc.exists) setUser(doc.data() as UserProps)
                })
    }

    useEffect(() => {
        loadUser()
    }, [user])

    console.log(user)

    return (
        <SafeAreaProvider>
            <StatusBar translucent />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <NavigationContainer ref={navigationRef}>
                    {user.auth ? <ContentNavigator /> : <StartNavigator />}
                </NavigationContainer>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    )
}

export default AppContent
