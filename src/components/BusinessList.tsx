import React, { useContext } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BussinessContext from '../context/business/BusinesseContext';
import { BusinessesModel } from '../models/yelp/BusinessesModel';

const BusinessList = ({
  data,
  navigation,
}: {
  data: BusinessesModel[];
  navigation: any;
}) => {
  const { state, actions } = useContext(BussinessContext);
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={styles.business}>
            <TouchableOpacity
              onPress={() => {
                actions.getById(item.id, navigation.navigate('Details'));
              }}
            >
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.information}>
              <Text style={styles.city}>{item.location?.city}</Text>
              <Text style={styles.city}>{item.rating}</Text>
            </View>
            <Image
              style={styles.image}
              source={
                item.image_url
                  ? {
                      uri: item.image_url,
                    }
                  : require('../images/no_image.jpeg')
              }
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
  information: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
