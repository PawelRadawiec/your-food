import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const FavoriteScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text>FavoriteScreen</Text>
      <Button
        title="Go to details"
        onPress={() => navigation.navigate('Details')}
      />
      <Text>Results list</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FavoriteScreen;
