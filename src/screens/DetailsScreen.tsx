import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BussinessContext from '../context/business/BusinesseContext';

const DetailsScreen = () => {
  const {
    state: { business },
    actions,
  } = useContext(BussinessContext);
  useFocusEffect(
    useCallback(() => {
      return () => {
        actions.setBusiness(null);
      };
    }, [])
  );
  return (
    <View>
      <Text>{business?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DetailsScreen;
