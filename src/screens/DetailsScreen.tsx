import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Linking, TouchableOpacity } from 'react-native';
import BussinessContext from '../context/business/BusinesseContext';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import StarsList from '../components/StarsList';

const DetailsScreen = ({ navigation }: { navigation: any }) => {
  const [displayAddress, setDisplayAddress] = useState<string>('');
  const [days, setDays] = useState(new Map<number, string>());
  const {
    state: { business },
    actions,
  } = useContext(BussinessContext);

  useEffect(() => {
    navigation.setOptions({ title: business?.name ? business.name : '...' });
    const joinAddreses = business?.location?.display_address?.join(', ');
    const openDays = business?.hours?.[0]?.open;
    setDisplayAddress(joinAddreses ? joinAddreses : '');
    const daysName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const daysMap = new Map<number, string>();
    daysName.forEach((dayName, index) => {
      const day = openDays?.find((item) => item.day === index);
      const convertedStart = `${day?.start?.slice(0, 2)}:${day?.start?.slice(2, 4)}`;
      const convertedEnd = `${day?.end?.slice(0, 2)}:${day?.end?.slice(2, 4)}`;
      daysMap.set(index, `${dayName}: ${convertedStart} - ${convertedEnd}`);
    });
    setDays(daysMap);
  }, [business]);

  return (
    <View style={styles.cotainer}>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsTitle}>
          <FontAwesome5 name="arrow-alt-circle-right" size={24} color="black" />
          <TouchableOpacity
            onPress={() => {
              if (business?.url) {
                Linking.openURL(business.url);
              }
            }}
          >
            <Text style={styles.title}>Visit page</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsTitle}>
          <MaterialIcons name="phone" size={24} color="black" />
          <Text style={styles.title}>{business?.display_phone}</Text>
        </View>
        <View style={styles.detailsTitle}>
          <FontAwesome5 name="door-open" size={24} color="black" />
          <Text style={styles.title}> {business?.is_closed ? 'No' : 'Yes'}</Text>
        </View>
        <StarsList rating={Number(business?.rating)} />
        <View style={styles.detailsTitle}>
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text style={styles.title}>{displayAddress}</Text>
        </View>
      </View>
      <View>
        <Button
          type="outline"
          buttonStyle={{
            borderColor: '#f4511e',
            borderWidth: 2,
          }}
          icon={{
            name: 'arrow-right',
            size: 15,
          }}
          title="Reviews"
          onPress={() => {
            navigation.navigate('Reviews');
          }}
        />
      </View>
      <View style={styles.days}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={business?.hours?.[0]?.open}
          keyExtractor={(item) => `id${item.day}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.dayBox}>
                <Text style={styles.dayBoxContent}>{days.get(item.day)}</Text>
              </View>
            );
          }}
        />
      </View>
      <View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={business?.photos}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              <Image
                style={styles.image}
                source={
                  item
                    ? {
                        uri: item,
                      }
                    : require('../images/no_image.jpeg')
                }
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
  },
  detailsContainer: {
    marginLeft: 10,
  },
  detailsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  days: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dayBox: {
    borderColor: '#f4511e',
    borderWidth: 3,
    width: 'auto',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  dayBoxContent: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  image: {
    width: 350,
    height: 350,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    margin: 10,
  },
  reviewsInfo: {},
});

export default DetailsScreen;
