import api from '../../apiSingleton';
import {UPDATE_DELIVERIES, UPDATE_DISTANCES} from '../constants/statistics';

export function getDeliveries(date_from, date_to, kitchen_code, user_id) {
  return async dispatch => {
    const data = await api.statistics.deliveries({
      date_from,
      date_to,
      kitchen_code,
      user_id,
    });

    dispatch({
      type: UPDATE_DELIVERIES,
      payload: data,
    });
  };
}
