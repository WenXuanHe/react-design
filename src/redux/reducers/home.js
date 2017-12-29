
import data from '../store/data';

let reducer = (state = data.home, action) => {

  const {type, payload} = action;

  switch (type) {
    case "QUERY_COUNT": 
      return {
          ...state,
          count: payload.count
      };
    default:
      return state;
  }
};

export default reducer;

