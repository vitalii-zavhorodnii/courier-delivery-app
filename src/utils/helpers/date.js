import 'moment/locale/ru';

import moment from 'moment';

export function getDate(date, format) {
    return moment(date).format(format);
}

export function getDateDifference(date) {
    const hours = moment().diff(date, 'hours');
    const minutes = moment().diff(date, 'minutes');

    return { hours, minutes: (minutes % 60).toFixed(0) };
}
