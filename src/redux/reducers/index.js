import {combineReducers} from 'redux';
import hello from './hello';
import home from './home';

export default combineReducers({
  home,
  hello
});
