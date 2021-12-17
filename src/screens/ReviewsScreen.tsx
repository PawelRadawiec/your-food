import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import BussinessContext from '../context/business/BusinesseContext';

const ReviewsScreen = () => {
  const {
    state: { reviews, loading, business },
    actions: { getReviews },
  } = useContext(BussinessContext);
  useEffect(() => {
    getReviews(business?.id);
  }, []);
  return (
    <View>
      {loading ? <BallIndicator  size={20}/> : <Text>{reviews.length}</Text>}
      <Text>ReviewsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReviewsScreen;
