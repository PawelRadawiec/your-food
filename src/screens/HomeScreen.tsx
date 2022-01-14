import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import SearchScreen from './SearchScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => {
            return <MaterialIcons name="search" size={24} color="black" />;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
