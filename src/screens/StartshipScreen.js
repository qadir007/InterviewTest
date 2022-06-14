import {Text, View, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import Screen from '../components/Screen';

export default () => {
  const [starships, setStarships] = useState([]);

  const getStartShips = async () => {
    try {
      const response = await fetch('https://swapi.co/api/starships/');
      const json = await response.json();
      setStarships(json.results);
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  useEffect(() => {
    getStartShips();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{padding:10, borderWidth:1 }}>
        <Text>showing name : </Text>
        <Text>cost_in_credits : </Text>
        <Text>passengers : </Text>
        <Text>cargo_capacity : </Text>
      </View>
    );
  };

  return (
    <Screen>
      <FlatList data={starships} renderItem={renderItem} />
    </Screen>
  );
};
