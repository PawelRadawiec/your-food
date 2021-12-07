import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SearchInput from '../components/SearchInput';

const SearchScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <SearchInput loading={false} onSearch={(value: string) => {
          console.log('Value: ', value);
      }}/>
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

export default SearchScreen;
