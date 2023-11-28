import { StyleSheet } from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode => StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : colors[mode].BACKGROUND_DARK,
        justifyContent  : 'center',
        alignItems      : 'center'
    },
    form : {
        width             : '80%',
    },
    title : {
        color        : colors[mode].TEXT_CONTRAST,
        fontSize     : 36,
        fontWeight   : 'bold',
        marginBottom : 30,
        textAlign    : 'center'
    },
    subTitle : {
        color        : colors[mode].TEXT_PRIMARY,
        fontSize     : 14,
        textAlign    : 'center',
        marginBottom : 30
    },
    input : {
        marginBottom : 20,
    }
});
