import * as React from 'react'

import { createStack } from './services/navigation'

import Login from './screens/Login/Login'
import Profile from './screens/Profile/Profile'
import CreateAccount from './screens/CreateAccount/CreateAccount'
import RecoveryPassword from './screens/RecoverPassword/RecoverPassword'
import Map from './screens/Map/Map'

const StartNavigator = () => {
    const StartStack = createStack()

    return (
        <StartStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <StartStack.Screen name="Login" component={Login} />
            <StartStack.Screen name="Create" component={CreateAccount} />
            <StartStack.Screen name="Recovery" component={RecoveryPassword} />
        </StartStack.Navigator>
    )
}

const ContentNavigator = () => {
    const ContentStack = createStack()

    return (
        <ContentStack.Navigator
            initialRouteName='Map'
            screenOptions={{ headerShown: false }}>
            <ContentStack.Screen name='Map' component={Map} />
            <ContentStack.Screen name="Profile" component={Profile} />

        </ContentStack.Navigator>
    )
}

const AppNavigator = () => {
    const Stack = createStack()

    return (
        <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartNavigator} />
            <Stack.Screen name="Content" component={ContentNavigator} />
        </Stack.Navigator>
    )
}

export default AppNavigator
