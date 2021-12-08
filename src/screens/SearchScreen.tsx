import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SearchInput from '../components/SearchInput';
import BussinessContext from '../context/business/BusinesseContext';

const SearchScreen = ({ navigation }: { navigation: any }) => {
  const { state, actions } = useContext(BussinessContext);
  return (
    <View style={styles.container}>
      <SearchInput
        loading={state.loading}
        onSearch={(value: string) => {
          console.log('Value: ', value);
          actions.search();
        }}
      />
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
