import {NavigationContainer} from '@react-navigation/native';
import AppTabs from './src/navigations/AppTabs';
import React from 'react';
const App = () => {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};

export default App;
