import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { KeyboardAvoidingView, Platform, LogBox } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator, ContentNavigator, StartNavigator } from './src/NavigationStack'
import * as analytics from 'expo-firebase-analytics';
import { navigationRef, routeNameRef } from './src/services/navigation'
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
        LogBox.ignoreAllLogs();//Ignore all log notifications
        loadUser()
    }, [user])

    return (
        <SafeAreaProvider>
            <StatusBar translucent />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <NavigationContainer
                    ref={navigationRef}
                    onReady={() => {
                        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
                    }}
                    onStateChange={async () => {
                        const previousRouteName = routeNameRef.current;
                        const currentRouteName = `${navigationRef.current.getCurrentRoute().name}`;

                        if (previousRouteName !== currentRouteName) {
                            analytics.setCurrentScreen(
                                currentRouteName,
                                currentRouteName,
                            );
                        }
                        routeNameRef.current = currentRouteName;
                    }}
                >
                    <AppNavigator />
                </NavigationContainer>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    )
}

export default AppContent
