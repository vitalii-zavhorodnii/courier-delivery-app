import AsyncStorage  from '@react-native-community/async-storage';

import { isAndroid } from './platform';

class Storage {
    static setItem(key, value, cb) {
        const strValue = typeof value !== 'string'
            ? JSON.stringify(value)
            : value;

        return AsyncStorage.setItem(key, strValue, cb);
    }

    static async getItem(key, cb) {
        const res = await AsyncStorage.getItem(key, cb);

        try {
            if (res !== null) {
                return JSON.parse(res);
            }

            return res;
        } catch (e) {
            return res;
        }
    }

    static removeItem(key) {
        return AsyncStorage.removeItem(key);
    }

    static async getAllKeys() {
        const res = await AsyncStorage.getAllKeys();

        try {
            if (res !== null) {
                return JSON.parse(res);
            }

            return res;
        } catch (e) {
            return res;
        }
    }

    static multiremove(keys, cb) {
        return AsyncStorage.multiRemove(keys, cb);
    }

    static async clear(cb) {
        const storageKeys = await this.getAllKeys();

        if (storageKeys.length > 0) {
            if (isAndroid) {
                return AsyncStorage.clear(cb);
            }

            return this.multiremove(storageKeys, cb);
        }
    }
}

export default Storage;
