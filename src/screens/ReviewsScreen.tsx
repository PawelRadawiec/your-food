import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import BussinessContext from '../context/business/BusinesseContext';
import ReviewsList from '../components/ReviewsList';

const ReviewsScreen = ({ navigation }: { navigation: any }) => {
  const {
    state: { reviews, reviewsPending, business },
    actions,
  } = useContext(BussinessContext);
  useEffect(() => {
    if (business?.id) {
      actions?.getReviews(business.id);
    }
    navigation.setOptions({ title: business?.name ? `Reviews - ${business.name}` : '...' });
    return () => {
      actions?.clearReviews();
    };
  }, []);
  return (
    <View style={styles.container}>
      {reviewsPending ? (
        <BallIndicator size={50} />
      ) : (
        <View>
          <ReviewsList reviews={reviews} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
});

export default ReviewsScreen;
