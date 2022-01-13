import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import BussinessContext from '../context/business/BusinesseContext';

const BusinessList = ({ navigation }: { navigation: any }) => {
  const {
    state: { selectedPending, loading, resultsMap },
    actions,
  } = useContext(BussinessContext);
  const [resultKeys, setResultsKyes] = useState<string[]>([]);
  useEffect(() => {
    setResultsKyes([...resultsMap.keys()]);
  }, [resultsMap]);
  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 70 }}
      data={resultKeys}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        return (
          <View>
            <Text style={styles.type}>{item}</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={0.01}
              horizontal={true}
              onEndReached={() => {
                if (!loading) {
                  const result = resultsMap.get(item);
                  const limit = result?.params.limit;
                  const params = { ...result?.params, limit: limit ? limit + 3 : 3 };
                  actions.search(params);
                }
              }}
              data={resultsMap.get(item)?.businesses}
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

                      {/* @todo - fix horizontal*/}
                      {/* <StarsList rating={Number(item.rating)} /> */}
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
    marginLeft: 10,
  },
});

export default BusinessList;
