import {TextInput} from 'react-native';
import React from 'react';

export default ({value, setValue, placeholder}) => {
  return (
    <TextInput
      onChangeText={setValue}
      value={value}
      style={{
        height: 60,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 10,
        borderRadius: 100,
      }}
      placeholder={placeholder || 'Search By Name'}
    />
  );
};
