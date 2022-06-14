import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

export default ({children, style}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {children}
    </SafeAreaView>
  );
};
