/* eslint-disable camelcase */
import Base from './Base.js';

export default class OrdersAPI extends Base {
  get() {
    return this.apiClient.get('mobile/orders');
  }

  start(payload) {
    return this.apiClient.post('mobile/deliveries', payload);
  }

  close(order_uuid, payload) {
    return this.apiClient.patch(`mobile/orders/${order_uuid}`, payload);
  }
}
