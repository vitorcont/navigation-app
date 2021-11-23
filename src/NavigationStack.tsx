import * as React from 'react';
import Login from './screens/Login/Login';
import { createStack } from './services/navigation';

const StartNavigator = () => {
  const StartStack = createStack();

  return (
    <StartStack.Navigator
      initialRouteName='LoginScreen'
      screenOptions={{ headerShown: false }}
    >
      <StartStack.Screen name='Login' component={Login} />
    </StartStack.Navigator>
  );
};

const ContentNavigator = () => {
  const ContentStack = createStack();

  return (
    <ContentStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <></>
    </ContentStack.Navigator>
  );
};

const AppNavigator = () => {
  const Stack = createStack();

  return (
    <Stack.Navigator initialRouteName='Start' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartNavigator} />
      {/* <Stack.Screen name="Content" component={ContentNavigator} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
