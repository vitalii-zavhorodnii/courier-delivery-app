/* eslint-disable camelcase */
import api from '../../apiSingleton';
import {
  UPDATE_DELIVERY_STATUS,
  UPDATE_IS_DELIVERY_LOADING,
  UPDATE_ORDERS,
} from '../constants/orders';

import {getUser} from './user';

async function fetchOrders() {
  const {data} = await api.orders.get();

  return data || [];
}

export function initializeOrders({onSuccess} = {}) {
  return async dispatch => {
    try {
      const orders = await fetchOrders();

      await dispatch({
        type: UPDATE_ORDERS,
        payload: {orders},
      });

      await dispatch(getUser());
      await dispatch(updateDeliveryStatus());
      await dispatch(updateDeliveryLoading(false));

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Fetch orders error', error);
    }
  };
}

export function startDelivery({orders, delivery_terminal_id, onError}) {
  return async dispatch => {
    try {
      await dispatch(updateDeliveryLoading(true));

      const {data} = await api.orders.start({orders, delivery_terminal_id});
      const {success} = data;

      if (!success) {
        onError();
      }

      await dispatch(getUser());
      await dispatch(updateDeliveryStatus());
      await dispatch(initializeOrders());
      await dispatch(updateDeliveryLoading(false));
    } catch (error) {
      console.error('Start delivery error', error);
      onError();
    }
  };
}

export function updateDeliveryStatus() {
  return async (dispatch, getState) => {
    const {data} = await getState().user.user;
    const isDeliveryStarted = data?.iiko?.status === 'on_delivery';

    await dispatch({
      type: UPDATE_DELIVERY_STATUS,
      payload: {isDeliveryStarted},
    });
  };
}

function updateDeliveryLoading(value) {
  return {
    type: UPDATE_IS_DELIVERY_LOADING,
    payload: {isDeliveryLoading: value},
  };
}

export function closeOrder(order_uuid, restaurant, latitude, longitude) {
  return async dispatch => {
    try {
      await api.orders.close(order_uuid, {restaurant, latitude, longitude});
      await dispatch(initializeOrders());
    } catch (error) {
      console.error('Close order error', error);
    }
  };
}
