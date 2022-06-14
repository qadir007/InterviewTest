import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import SearchInput from '../components/forms/SearchInput';
import SingleDropdown from '../components/forms/SingleDropdown';
import Screen from '../components/Screen';
import React from 'react';
import sortArray from '../utils/sort';
import {filterSingleValueArray, filterMultiValueArray} from '../utils/filter';
import MultipleDropdown from '../components/forms/MultipleDropdown';

export default () => {
  const [planets, setPlanets] = useState([]);
  const [tempPlanets, setTempPlanets] = useState([]);
  const [searchedPlanets, setSearchedPlanets] = useState([]);

  const [search, setSearch] = useState('');

  //   filter
  const [filtered, setFiltered] = useState(null);
  const [selectedTerrain, setSelectedTerrain] = useState([]);
  const [climates, setClimates] = useState([]);
  const [terrain, setTerrains] = useState([]);

  //   sorted by
  const [sorted, setSorted] = useState(null);
  const [sortitems, setSortItems] = useState([
    {label: 'name', value: 'name'},
    {label: 'population', value: 'population'},
    {label: 'residents', value: 'residents'},
  ]);

  //   get data from apis function
  const getPlanets = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const json = await response.json();
      const result = json.results;
      setPlanets(result);
      setClimates(
        result.map(planet => ({label: planet.climate, value: planet.climate})),
      );
      setTerrains(
        result.map(planet => ({label: planet.terrain, value: planet.terrain})),
      );
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  //   get data from apis
  useEffect(() => {
    getPlanets();
  }, []);

  //   listen to search input
  useEffect(() => {
    if (search) {
      if (sorted || filtered) {
        const result = tempPlanets.filter(planet => {
          return planet.name.toLowerCase().includes(search.toLowerCase());
        });
        setSearchedPlanets(result);
      } else {
        const result = planets.filter(planet => {
          return planet.name.toLowerCase().includes(search.toLowerCase());
        });
        setSearchedPlanets(result);
      }
    }
  }, [search]);

  // listen to sort dropdown
  useEffect(() => {
    if (sorted && filtered && selectedTerrain.length > 0) {
      const filter = filterSingleValueArray(planets, 'climate', filtered);
      const sort = sortArray(filter, sorted);
      setTempPlanets(sort);
    } else if (sorted && selectedTerrain.length) {
      const result = filterMultiValueArray(planets, 'terrain', selectedTerrain);
      const sort = sortArray(result, sorted);
      setTempPlanets(sort);
    } else if (filtered && selectedTerrain.length > 0) {
      const result = filterMultiValueArray(planets, 'terrain', selectedTerrain);
      const filter = filterSingleValueArray(result, 'climate', filtered);
      const sort = sortArray(filter, sorted);
      setTempPlanets(sort);
    } else if (sorted && filtered) {
      const filter = filterSingleValueArray(planets, 'climate', filtered);
      const sort = sortArray(filter, sorted);
      setTempPlanets(sort);
    } else if (sorted) {
      const sort = sortArray(planets, sorted);
      setTempPlanets(sort);
    } else if (selectedTerrain.length > 0) {
      const result = filterMultiValueArray(planets, 'terrain', selectedTerrain);
      setTempPlanets(result);
    } else if (filtered) {
      const filter = filterSingleValueArray(planets, 'climate', filtered);
      setTempPlanets(filter);
    } else setTempPlanets([]);
  }, [filtered, sorted, selectedTerrain]);

  const renderItem = ({item}) => {
    return (
      <View style={{padding: 10, borderWidth: 1}}>
        <Text>showing name : {item.name}</Text>
        <Text>climate : {item?.climate} </Text>
        <Text>terrain : {item.terrain}</Text>
        <Text>population : {item.population}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <SearchInput
        placeholder="Search By Planets"
        value={search}
        setValue={setSearch}
      />
      <FlatList
        data={
          search
            ? searchedPlanets
            : sorted || filtered || selectedTerrain.length
            ? tempPlanets
            : planets
        }
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <>
            <SingleDropdown
              items={sortitems}
              setItems={setSortItems}
              setValue={setSorted}
              value={sorted}
              title="Sort By"
            />
            <SingleDropdown
              items={climates}
              setItems={setClimates}
              setValue={setFiltered}
              value={filtered}
              title="Filter By Climents"
            />
            <MultipleDropdown
              items={terrain}
              selected={selectedTerrain}
              setSelected={setSelectedTerrain}
            />
          </>
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text>
              {search && searchedPlanets.length < 1
                ? 'Search result is empty'
                : ' NO Items Found'}
            </Text>
          </View>
        }
      />
    </Screen>
  );
};
