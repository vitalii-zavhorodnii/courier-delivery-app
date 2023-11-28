import {combineReducers} from 'redux';

import location from './location';
import orders from './orders';
import session from './session';
import snackBar from './snackBar';
import theme from './theme';
import user from './user';
import statistics from './statistics';

export default combineReducers({
  location,
  orders,
  session,
  snackBar,
  theme,
  user,
  statistics,
});
