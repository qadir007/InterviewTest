const filterSingleValueArray = (array = [], filterBy, filterValue) => {
  try {
    const result = array.filter(item => {
      if (item[filterBy] === filterValue) {
        return true;
      }
      return false;
    });
    return result;
  } catch (error) {
    return array;
  }
};

const filterMultiValueArray = (array = [], filterBy, filterValues) => {
  try {
    const result = [];
    filterValues.forEach(value => {
      const temp = array.filter(item => {
        if (item[filterBy] === value) {
          return true;
        }
        return false;
      });
      result.push(...temp);
    });
    return result;
  } catch (error) {
    return array;
  }
};

export {filterSingleValueArray, filterMultiValueArray};
