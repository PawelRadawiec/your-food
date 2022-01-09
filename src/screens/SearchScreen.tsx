import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import BusinessList from '../components/BusinessList';
import SearchForm from '../components/SearchForm';
import BussinessContext from '../context/business/BusinesseContext';

const SearchScreen = ({ navigation }: { navigation: any }) => {
  const {
    state: { loading, results },
    actions,
  } = useContext(BussinessContext);
  return (
    <View style={styles.container}>
      <SearchForm
        loading={loading}
        onSearch={(phrase: string) => {
          actions.search(phrase);
        }}
        onUnselected={(type: string) => {
            actions.deleteResultByType(type);
        }}
      />
      <BusinessList data={results} navigation={navigation} />
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
