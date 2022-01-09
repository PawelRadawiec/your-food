import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { BallIndicator } from 'react-native-indicators';
import { debounceTime, Subject } from 'rxjs';
import { BussinessSearchParams } from '../models/api/BusinessSearchParams';

const SearchForm = ({ onSearch, onUnselected, loading }: { onSearch: any; onUnselected: any; loading: boolean }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [location, setLocation] = useState('');
  const [types, setTypes] = useState([
    {
      name: 'Pizza',
      value: 'pizza',
      selected: false,
    },
    {
      name: 'Sushi',
      value: 'sushi',
      selected: false,
    },
    {
      name: 'Burger',
      value: 'burger',
      selected: false,
    },
    {
      name: 'Pasta',
      value: 'pasta',
      selected: false,
    },
    {
      name: 'Steak',
      value: 'steak',
      selected: false,
    },
    {
      name: 'Meat',
      value: 'meat',
      selected: false,
    },
    {
      name: 'Beer',
      value: 'beer',
      selected: false,
    },
    {
      name: 'Wine',
      value: 'wine',
      selected: false,
    },
  ]);
  const [searchSubject] = useState(new Subject<BussinessSearchParams>());
  useEffect(() => {
    const subscription = searchSubject.pipe(debounceTime(500)).subscribe((params: BussinessSearchParams) => {
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
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item) => item.value}
        data={types}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (loading) {
                  return;
                }
                const typesCopy = [...types];
                const selectedIndex = typesCopy.findIndex((type) => type.value === item.value);
                typesCopy[selectedIndex] = { ...item, selected: !item.selected };
                setTypes(typesCopy);
                setSelectedIndex(selectedIndex);
                if (typesCopy[selectedIndex].selected) {
                  searchSubject.next({ term: item.value, location });
                } else {
                  setSelectedIndex(-1);
                  onUnselected(item.value);
                }
              }}
            >
              <View style={item.selected ? styles.typeSelected : styles.type}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Input
        placeholder="Location"
        value={location}
        disabled={loading}
        onChangeText={(value: string) => {
          setLocation(value);
          searchSubject.next({ term: types[selectedIndex]?.value, location });
        }}
      />
      {loading ? <BallIndicator style={styles.spinner} size={20} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: 400,
  },
  spinner: {
    marginBottom: 10,
    marginLeft: 10,
  },
  type: {
    borderColor: '#f4511e',
    borderWidth: 3,
    width: 'auto',
    padding: 5,
    margin: 10,
    borderRadius: 10,
  },
  typeSelected: {
    backgroundColor: '#f4511e',
    width: 'auto',
    padding: 7,
    margin: 10,
    color: 'black',
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchForm;
