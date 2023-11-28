import Base from './Base.js';

export default class StatisticsAPI extends Base {
  deliveries(payload) {
    return this.apiClient.get('olap/deliveries', payload);
  }

  distances(payload) {
    return this.apiClient.get('olap/distances', payload);
  }
}
