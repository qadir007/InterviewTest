import {StyleSheet, View} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import React from 'react';

export default ({title, items, selected, setSelected}) => {
  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        labelField="label"
        valueField="value"
        placeholder={`Select ${title || 'items'}`}
        searchPlaceholder="Search..."
        value={selected}
        onChange={item => {
          setSelected(item);
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 16},
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
