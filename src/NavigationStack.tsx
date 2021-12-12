import * as React from 'react'

import { createStack } from './services/navigation'

import Login from './screens/Login/Login'
import Profile from './screens/Profile/Profile'
import CreateAccount from './screens/CreateAccount/CreateAccount'
import RecoveryPassword from './screens/RecoverPassword/RecoverPassword'
import Map from './screens/Map/Map'
import PersonalData from './screens/PersonalData/PersonalData'
import TermsOfService from './screens/TermsOfService/TermsOfService'
import Destinations from './screens/Destinations/Destinations'

export const StartNavigator = () => {
    const StartStack = createStack()

    return (
        <StartStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <StartStack.Screen name="Login" component={Login} />
            <StartStack.Screen name="Create" component={CreateAccount} />
            <StartStack.Screen name="Recovery" component={RecoveryPassword} />
        </StartStack.Navigator>
    )
}

export const ContentNavigator = () => {
    const ContentStack = createStack()

    return (
        <ContentStack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
            <ContentStack.Screen name="Map" component={Map} />
            <ContentStack.Screen name="ProfileNavigator" component={ProfileNavigator} />
        </ContentStack.Navigator>
    )
}

const ProfileNavigator = () => {
    const ProfileStack = createStack()

    return (
        <ProfileStack.Navigator initialRouteName="Map" screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="Profile" component={Profile} />
            <ProfileStack.Screen name="PersonalData" component={PersonalData} />
            <ProfileStack.Screen name="Destinations" component={Destinations} />
            <ProfileStack.Screen name="TermsOfService" component={TermsOfService} />
        </ProfileStack.Navigator>
    )
}

export const AppNavigator = () => {
    const Stack = createStack()

    return (
        <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartNavigator} />
            <Stack.Screen name="Content" component={ContentNavigator} />
        </Stack.Navigator>
    )
}
