import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subject, concatMap } from 'rxjs';
import BusinessList from '../components/BusinessList';
import SearchForm from '../components/SearchForm';
import BussinessContext from '../context/business/BusinesseContext';
import { SearchType } from '../context/business/models/SearchType';
import { BussinessSearchParams } from '../models/api/BusinessSearchParams';

const SearchScreen = ({ navigation }: { navigation: any }) => {
  const {
    state: { loading, resultsMap },
    actions,
  } = useContext(BussinessContext);
  const [searchSubject] = useState(new Subject<BussinessSearchParams>());
  useEffect(() => {
    const subscription = searchSubject
      .pipe(
        concatMap((params: BussinessSearchParams) => {
          const result = resultsMap.get(params?.term!);
          const limit = result?.params?.limit;
          params.limit = limit ? limit + 3 : 3
          return actions.search(params);
        })
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <View style={styles.container}>
      <SearchForm
        loading={loading}
        onSelect={(params: BussinessSearchParams) => {
          if (params?.location) {
            searchSubject.next(params);
          }
        }}
        onUnselected={(type: string) => {
          actions.deleteResultByType(type);
        }}
        onLocationEndEditing={(location: string, types: SearchType[]) => {
          const selectedTypes = types?.filter((type) => type.selected);
          if (selectedTypes.length > 0 && location.length > 0) {
            selectedTypes.forEach((type) => {
              searchSubject.next({ term: type.value, location });
            });
          }
        }}
      />
      <BusinessList navigation={navigation} />
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
