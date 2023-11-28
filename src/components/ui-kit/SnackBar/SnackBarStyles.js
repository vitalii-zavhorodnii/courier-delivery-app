import { StyleSheet } from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode => StyleSheet.create({
    container : {
        minWidth        : '100%',
        height          : 35,
        backgroundColor : colors[mode].PRIMARY,
        position        : 'absolute',
        left            : 0,
        zIndex          : 1,
        justifyContent  : 'center',
        alignItems      : 'center'
    },
    message : {
        fontSize  : 14,
        color     : colors[mode].TEXT_SECONDARY,
        width     : '100%',
        textAlign : 'center'
    }
});
