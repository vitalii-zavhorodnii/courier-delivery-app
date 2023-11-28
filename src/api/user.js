import Base from './Base.js';

export default class UserAPI extends Base {
    get() {
        return this.apiClient.get('me');
    }

    location(payload) {
        return this.apiClient.get('mobile/me/coordinates', payload);
    }
}
