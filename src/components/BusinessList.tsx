import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { BusinessesModel } from '../models/yelp/BusinessesModel';

const BusinessList = ({ data }: { data: BusinessesModel[] }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={styles.business}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.city}>{item.location?.city}</Text>
            <Image
              style={styles.image}
              source={{
                uri: item.image_url,
              }}
            />
          </View>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  business: {
    marginVertical: 10,
  },
  image: {
    width: 350,
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  city: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BusinessList;
