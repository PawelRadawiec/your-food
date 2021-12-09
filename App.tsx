import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BusinesseProvider } from './src/context/business/BusinesseContext';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen name="Details" component={DetailsScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <BusinesseProvider>
      <App />
    </BusinesseProvider>
  );
};
