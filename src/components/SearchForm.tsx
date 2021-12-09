import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { BallIndicator } from 'react-native-indicators';
import { debounceTime, Subject } from 'rxjs';
import { BussinessSearchParams } from '../models/api/BusinessSearchParams';

const SearchForm = ({
  onSearch,
  loading,
}: {
  onSearch: any;
  loading: boolean;
}) => {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [searchSubject] = useState(new Subject<BussinessSearchParams>());
  useEffect(() => {
    const subscription = searchSubject
      .pipe(debounceTime(1000))
      .subscribe((params: BussinessSearchParams) => {
        params.limit = 50;
        if (params?.location && params?.term) {
          onSearch(params);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search"
        value={term}
        disabled={loading}
        onChangeText={(value: string) => {
          setTerm(value);
          searchSubject.next({ term, location });
        }}
      />
      <Input
        placeholder="Location"
        value={location}
        disabled={loading}
        onChangeText={(value: string) => {
          setLocation(value);
          searchSubject.next({ term, location });
        }}
      />
      {loading ? <BallIndicator style={styles.spinner} size={20} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 300,
  },
  spinner: {
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default SearchForm;
