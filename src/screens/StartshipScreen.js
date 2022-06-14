import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import SearchInput from '../components/forms/SearchInput';
import Screen from '../components/Screen';
import React from 'react';
export default () => {
  const [starships, setStarships] = useState([]);
  const [searchedStarships, setSearchedStarships] = useState([]);

  const [search, setSearch] = useState('');

  //   get data from apis function
  const getStarships = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/starships');
      const json = await response.json();
      const result = json.results;
      setStarships(result);
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  //   get data from apis
  useEffect(() => {
    getStarships();
  }, []);

  //   listen to search input
  useEffect(() => {
    if (search) {
      const result = starships.filter(ship => {
        return ship.name.toLowerCase().includes(search.toLowerCase());
      });
      setSearchedStarships(result);
    }
  }, [search]);

  const renderItem = ({item}) => {
    return (
      <View style={{padding: 10, borderWidth: 1}}>
        <Text>name : {item.name}</Text>
        <Text>cost_in_credits : {item?.cost_in_credits} </Text>
        <Text>passengers : {item.passengers}</Text>
        <Text>cargo_capacity : {item.cargo_capacity}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <SearchInput
        placeholder="Search By startship"
        value={search}
        setValue={setSearch}
      />
      <FlatList
        data={search ? searchedStarships : starships}
        renderItem={renderItem}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text>
              {search && searchedStarships.length < 1
                ? 'Search result is empty'
                : ' NO Items Found'}
            </Text>
          </View>
        }
      />
    </Screen>
  );
};
