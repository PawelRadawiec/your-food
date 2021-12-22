import React from 'react';
import { StyleSheet, FlatList, View, Image, Text } from 'react-native';
import { BusinessReview } from '../context/business/models/BusinessReview';
import { MaterialIcons } from '@expo/vector-icons';

const ReviewsList = ({ reviews }: { reviews: BusinessReview[] }) => {
  const ratings = (size: number): number[] => {
    const stars = [];
    for (let i = 0; i < size; i++) {
      stars.push(i);
    }
    return stars;
  };
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.review}>
            <View style={styles.reviewImage}>
              <Image
                style={styles.image}
                source={
                  item.user.image_url
                    ? {
                        uri: item.user.image_url,
                      }
                    : require('../images/no_image.jpeg')
                }
              />
            </View>

            <View style={styles.reviewInfo}>
              <Text style={styles.name}>{item.user?.name}</Text>
              <FlatList
                style={styles.stars}
                data={ratings(item.rating)}
                keyExtractor={(item) => `id${item}`}
                renderItem={() => {
                  return <MaterialIcons name="star" size={24} color="black" />;
                }}
              />
              <Text style={styles.reviewText}>{item.text}</Text>
              <Text>{item.time_created}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  review: {
    flexDirection: 'row',
    alignContent: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
    textAlign: 'right',
  },
  reviewImage: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  reviewInfo: {
    flexDirection: 'column',
    marginLeft: 5,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 16,
  },
  stars: {
    flexDirection: 'row',
  },
});

export default ReviewsList;
