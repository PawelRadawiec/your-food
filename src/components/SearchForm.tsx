import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { BallIndicator } from 'react-native-indicators';
import { SearchType } from '../context/business/models/SearchType';

const SearchForm = ({
  onSelect,
  onUnselected,
  onLocationEndEditing,
  loading,
}: {
  onSelect: any;
  onUnselected: any;
  onLocationEndEditing: any;
  loading: boolean;
}) => {
  const [location, setLocation] = useState('');
  const [types, setTypes] = useState<SearchType[]>([
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

  const typeOnPress = (item: SearchType) => {
    const typesCopy = [...types];
    const selectedIndex = typesCopy.findIndex((type) => type.value === item.value);
    typesCopy[selectedIndex] = { ...item, selected: !item.selected };
    setTypes(typesCopy);
    const selected = typesCopy[selectedIndex].selected;
    if (selected) {
      onSelect({ term: item.value, location });
    } else {
      onUnselected(item.value);
    }
  };

  const locationEndEditing = (location: string) => {
    setLocation(location);
    onLocationEndEditing(location, types);
  };

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
                typeOnPress(item);
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
        leftIcon={{ type: 'font-awesome', name: 'search' }}
        onChangeText={(value: string) => {
          setLocation(value);
        }}
        onEndEditing={() => {
          locationEndEditing(location);
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
    marginBottom: 10,
  },
  spinner: {
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
