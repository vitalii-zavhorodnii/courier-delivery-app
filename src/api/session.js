import Base from './Base.js';

export default class SessionAPI extends Base {
    create(payload) {
        return this.apiClient.post('login', payload);
    }
}
