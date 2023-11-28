import produce from 'immer';

import {UPDATE_DELIVERIES, UPDATE_DISTANCES} from '../constants/statistics';

const initialState = {
  deliveries: null,
  distances: null,
};

export default produce((draft, action) => {
  const {payload} = action;

  switch (action.type) {
    case UPDATE_DELIVERIES: {
      draft.deliveries = payload;
      break;
    }

    default:
      break;
  }
}, initialState);
