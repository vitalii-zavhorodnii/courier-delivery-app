/* eslint-disable camelcase */
import Base from './Base.js';

export default class OrdersAPI extends Base {
    sendCoordinates(payload) {
        return this.apiClient.put('mobile/me/coordinates', payload);
    }
}
