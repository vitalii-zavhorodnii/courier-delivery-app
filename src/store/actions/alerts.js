import { Alert } from 'react-native';

import i18n from '../../utils/i18n';

export function callAlert(title = i18n.t('Ошибка'), message = i18n.t('Что-то пошло не так')) {
    return async () => {
        Alert.alert(title, message);
    };
}
