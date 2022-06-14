import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlanetsScreen from '../screens/PlanetsScreen';
import StartshipScreen from '../screens/StartshipScreen';
import React from 'react';

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Planets" component={PlanetsScreen} />
      <Tabs.Screen name="Starships" component={StartshipScreen} />
    </Tabs.Navigator>
  );
};

export default AppTabs;
