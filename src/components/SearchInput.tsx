import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { BallIndicator } from 'react-native-indicators';
import { debounceTime, Subject } from 'rxjs';

const SearchInput = ({
  onSearch,
  loading,
}: {
  onSearch: any;
  loading: boolean;
}) => {
  const [phrase, setPhrase] = useState('');
  const [searchSubject] = useState(new Subject<string>());
  useEffect(() => {
    const subscription = searchSubject
      .pipe(debounceTime(1000))
      .subscribe((value: string) => {
        onSearch(value);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search"
        value={phrase}
        disabled={loading}
        onChangeText={(value: string) => {
          setPhrase(value);
          searchSubject.next(value);
        }}
      />
      {loading ? <BallIndicator style={styles.spinner} size={20} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 300,
  },
  spinner: {
    marginBottom: 20,
    marginLeft: 10,
  },
});

export default SearchInput;
