/*eslint no-prototype-builtins: "off"*/
/* eslint-disable camelcase*/
import LIVR from 'livr';

import i18n from '../i18n';
import rules from './rules';


LIVR.Validator.defaultAutoTrim(true);
const REQUIRED_ERRORS = {
    phone    : () => i18n.t('Обязательное поле'),
    password : () => i18n.t('Обязательное поле')
};

const TOO_SHORT_ERRORS = {
    phone    : () => i18n.t('Номер телефона не валидный'),
    password : () => i18n.t('Минимум 8 символов')
};

const WRONG_FORMAT_ERRORS = {
    phone : () => i18n.t('Неверный формат номера')
};

const INVALID_LOGIN_DATA = {
    phone : () => i18n.t('Неверный номер или пароль')
};

function validate({ rule, data, onSuccess, onError }) {
    const validator = new LIVR.Validator(rule);

    const validData = validator.validate(data);

    if (validData) {
        if (onSuccess) onSuccess(validData);
    } else {
        const decodedErrors = decodeErrorObject(validator.getErrors());

        if (onError) onError(decodedErrors);
    }
}

export function validateCreateSession(args) {
    return validate({ rule: rules.createSession, ...args });
}

export function decodeErrorObject(errors) {
    const decodedErrors = { ...errors };

    for (const field in decodedErrors) {
        if (decodedErrors.hasOwnProperty(field)) {
            const errorField = field.replace('data/', '');

            decodedErrors[errorField] = decodeErrorCode(decodedErrors[field], errorField);
        }
    }

    return decodedErrors;
}

export function decodeErrorCode(code, field = '') {
    switch (code) {
        case 'REQUIRED': {
            const errorMessage = field && REQUIRED_ERRORS[field]();

            return errorMessage || 'Обязательное поле';
        }

        case 'TOO_SHORT': {
            const errorMessage = field && TOO_SHORT_ERRORS[field]();

            return errorMessage || 'Слишком короткое значение';
        }

        case 'NOT_INTEGER': {
            const errorMessage = field && WRONG_FORMAT_ERRORS[field]();

            return errorMessage || 'Слишком короткое значение';
        }

        case 'INVALID_LOGIN_DATA': {
            const errorMessage = field && INVALID_LOGIN_DATA[field]();

            return errorMessage || i18n('Неверные данные');
        }

        default:
            return code;
    }
}
