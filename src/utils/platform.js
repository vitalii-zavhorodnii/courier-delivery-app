import { Dimensions, Platform } from 'react-native';

const windowContainer = Dimensions.get('window');
const screenContainer = Dimensions.get('screen');

export const ww = windowContainer.width;
export const wh = windowContainer.height;
export const sw = screenContainer.width;
export const sh = screenContainer.height;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const platform = Platform.OS;

export default {
    isIOS,
    isAndroid,
    platform
};
