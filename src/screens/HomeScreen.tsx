import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import FavoriteScreen from './FavoriteScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={SearchScreen}></Tab.Screen>
      <Tab.Screen name="Favorite" component={FavoriteScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
