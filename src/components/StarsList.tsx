import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const StarsList = ({ rating }: { rating: number }) => {
  const [stars, setStars] = useState<number[]>([]);
  const [isDecimal, setIsDecimal] = useState<boolean>(false);
  useEffect(() => {
    setIsDecimal(rating % 1 !== 0);
    const stars: number[] = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(i);
    }
    setStars(stars);
  }, [rating]);
  return (
    <FlatList
      horizontal={true}
      data={stars}
      keyExtractor={(item) => `id${item}`}
      renderItem={({ index }) => {
        return isDecimal && index === stars.length - 1 ? (
          <MaterialIcons name="star-half" size={24} color="black" />
        ) : (
          <MaterialIcons name="star" size={24} color="black" />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default StarsList;
