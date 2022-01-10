import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subject, concatMap } from 'rxjs';
import BusinessList from '../components/BusinessList';
import SearchForm from '../components/SearchForm';
import BussinessContext from '../context/business/BusinesseContext';
import { BussinessSearchParams } from '../models/api/BusinessSearchParams';

const SearchScreen = ({ navigation }: { navigation: any }) => {
  const {
    state: { loading, results },
    actions,
  } = useContext(BussinessContext);
  const [searchSubject] = useState(new Subject<BussinessSearchParams>());
  useEffect(() => {
    const subscription = searchSubject
    .pipe(
      concatMap((params: BussinessSearchParams) => {
        return actions.search(params);
      })
    )
    .subscribe();
  return () => {
    subscription.unsubscribe();
  };
  }, [])
  return (
    <View style={styles.container}>
      <SearchForm
        loading={loading}
        onSelect={(params: BussinessSearchParams) => {
          searchSubject.next(params)
        }}
        onUnselected={(type: string) => {
          actions.deleteResultByType(type);
        }}
        onLocationEndEditing={(location: string) => {

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
