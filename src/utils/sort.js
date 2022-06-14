import _ from 'lodash';

const sortArray = (array = [], key) => {
  try {
    return _.sortBy(array, key);
  } catch (error) {
    return array;
  }
};

export default sortArray;
