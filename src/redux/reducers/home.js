
import data from '../store/data';

let reducer = (state = data.home, action) => {

  const {type, payload} = action;

  switch (type) {
    default:
      return state;
  }
};

export default reducer;

