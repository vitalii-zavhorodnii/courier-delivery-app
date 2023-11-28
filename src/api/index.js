import ApiClient from './ApiClient';
import LocationAPI from './location';
import OrdersAPI from './orders';
import SessionAPI from './session';
import UserAPI from './user';
import StatisticsAPI from './statistics';

export default function apiConstruct({
  apiUrl,
  prefix,
  onError,
  onNetworkError,
}) {
  if (!apiUrl) {
    throw new Error('[apiUrl] required');
  }

  const apiClient = new ApiClient({
    apiUrl,
    prefix,
    onError,
    onNetworkError,
  });

  return {
    apiClient,
    statistics: new StatisticsAPI({apiClient}),
    location: new LocationAPI({apiClient}),
    orders: new OrdersAPI({apiClient}),
    session: new SessionAPI({apiClient}),
    user: new UserAPI({apiClient}),
  };
}
