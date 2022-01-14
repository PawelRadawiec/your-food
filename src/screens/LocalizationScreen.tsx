import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BussinessContext from '../context/business/BusinesseContext';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const LocalizationScreen = ({ navigation }: { navigation: any }) => {
  const {
    state: { business },
  } = useContext(BussinessContext);
  useEffect(() => {
    navigation.setOptions({ title: business?.name ? business.name : '...' });
  }, [business]);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: business!.coordinates.latitude,
          longitude: business!.coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: business!.coordinates.latitude, longitude: business!.coordinates.longitude }}
          title={business?.name}
          description={business?.location?.display_address.join(', ')}
        />
      </MapView>
      <View style={styles.information}>
        <Text style={styles.informationItem}>{business?.name}</Text>
        <Text style={styles.informationItem}>
          {business?.location.city} {business?.location.zip_code}
        </Text>
        <Text style={styles.informationItem}>
          {business?.location.country} {business?.location.state}
        </Text>
        <Text style={styles.informationItem}>{business?.location.display_address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 2,
  },
  information: {
    flex: 1,
    marginTop: 10,
  },
  informationItem: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default LocalizationScreen;
