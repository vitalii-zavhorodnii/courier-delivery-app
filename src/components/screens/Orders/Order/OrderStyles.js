import { StyleSheet } from 'react-native';

import colors from '../../../../assets/constants/colors';

export default mode => StyleSheet.create({
    container : {
        backgroundColor : colors[mode].ORDER_BG,
        width           : '100%',
        padding         : 10,
        borderRadius    : 8,
        elevation       : 2,
        marginBottom    : 20,
        shadowRadius    : 1,
        shadowColor     : '#eaeaea',
        shadowOpacity   : 1,
        shadowOffset    : {
            width  : 0,
            height : 4
        }
    },
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
    },
    address : {
        width             : '100%',
        paddingVertical   : 10,
        borderBottomColor : '#ECECEC',
        borderBottomWidth : 1
    },
    addressText : {
        fontSize : 16
    },
    footer : {
        width          : '100%',
        paddingTop     : 10,
        flexDirection  : 'row',
        justifyContent : 'space-between',
        alignItems     : 'center'
    },
    paymentTitle : {
        fontSize : 16
    },
    sum : {
        fontSize : 16,
        color    : colors[mode].PRIMARY
    }
});
