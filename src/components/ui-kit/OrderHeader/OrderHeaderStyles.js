import { StyleSheet } from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode => StyleSheet.create({
    header : {
        width             : '100%',
        flexDirection     : 'row',
        justifyContent    : 'space-between',
        borderBottomColor : '#ECECEC',
        borderBottomWidth : 1,
        paddingBottom     : 15
    },
    headerLeft : {
        flexDirection : 'row',
        alignItems    : 'center'
    },
    headerRight : {
        flexDirection : 'row',
        alignItems    : 'center'
    },
    restaurantLogo : {
        marginRight : 7
    },
    restaurantName : {
        fontSize   : 16,
        color      : colors[mode].PRIMARY,
        fontWeight : '500'
    },
    deliveryIcon : {
        marginRight : 5
    },
    expectedDelivery : {
        fontSize   : 16,
        fontWeight : '500'
    },
    latetime : {
        color      : colors[mode].ERROR,
        fontSize   : 16,
        marginLeft : 5
    }
});
