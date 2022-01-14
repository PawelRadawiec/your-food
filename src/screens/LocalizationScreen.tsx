import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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
    <View>
      <MapView
        style={styles.container}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 300,
  },
});

export default LocalizationScreen;
