import { StyleSheet } from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode => StyleSheet.create({
    button : {
        width           : 10,
        height          : 10,
        borderRadius    : 5,
        backgroundColor : colors[mode].PRIMARY
    },
    containerStyle : {
        width           : 16,
        height          : 16,
        borderRadius    : 8,
        backgroundColor : colors[mode].BACKGROUND,
        alignItems      : 'center',
        justifyContent  : 'center',
        borderWidth     : 1,
        borderColor     : colors[mode].PRIMARY
    },
    container : {
        flexDirection : 'row',
        alignItems    : 'center'
    },
    title : {
        marginLeft : 10
    }
});
