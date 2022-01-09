import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import { of } from 'rxjs';
import BussinessContext from '../context/business/BusinesseContext';
import { BusinessesModel } from '../models/yelp/BusinessesModel';
import StarsList from './StarsList';

const BusinessList = ({ data, navigation }: { data: BusinessesModel[]; navigation: any }) => {
  const {
    state: { selectedPending, params, loading, resultsMap },
    actions,
  } = useContext(BussinessContext);
  const [resultKeys, setResultsKyes] = useState<string[]>([]);
  useEffect(() => {
    setResultsKyes([...resultsMap.keys()]);
  }, [resultsMap]);
  return (
    <FlatList
      data={resultKeys}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        return (
          <View>
            <Text style={styles.type}>{item}</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              onEndReached={() => {
                if (!loading) {
                  // todo - on end params
                  // actions.search(params);
                }
              }}
              data={resultsMap.get(item)}
              renderItem={({ item }) => {
                return (
                  <View style={styles.business}>
                    {selectedPending.id === item.id && selectedPending.pending ? (
                      <BallIndicator size={20} />
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (!selectedPending.pending) {
                            actions.getById(item.id, navigation);
                          }
                        }}
                      >
                        <Text style={styles.title}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    <View style={styles.information}>
                      <View>
                        <Text style={styles.city}>{item.location?.city}</Text>
                      </View>
                      <View>
                        <Text style={styles.city}>Reviews {item.review_count}</Text>
                      </View>
                      <View>
                        {/* @todo - fix horizontal*/}
                        {/* <StarsList rating={Number(item.rating)} /> */}
                      </View>
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
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  business: {
    marginHorizontal: 10,
  },
  image: {
    width: 350,
    height: 200,
  },
  information: {
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  city: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
    marginLeft: 10
  }
});

export default BusinessList;
