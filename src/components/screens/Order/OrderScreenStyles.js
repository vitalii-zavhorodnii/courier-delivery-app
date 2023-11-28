import { StyleSheet } from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode => StyleSheet.create({
    container : {
        minHeight       : '100%',
        backgroundColor : '#F7F7F7',
        padding         : 20
    },
    headerRight : {
        marginRight : 20,
        fontWeight  : 'bold',
        color       : colors[mode].PRIMARY
    },
    block : {
        borderBottomWidth : 1,
        borderBottomColor : '#ECECEC',
        paddingVertical   : 20
    },
    blockTitle : {
        fontSize     : 18,
        fontWeight: "700",
        marginBottom : 15
    },
    customer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    address : {
        flexDirection  : 'row',
        justifyContent : 'space-between',
        alignItems     : 'center'
    },
    addressText : {
        maxWidth : '75%'
    },
    payment : {
        flexDirection  : 'row',
        justifyContent : 'space-between'
    },
    paymentTitle : {
        fontSize : 16
    },
    sum : {
        fontSize : 16,
        color    : colors[mode].PRIMARY
    },
    paymentTotal : {
        flexDirection     : 'row',
        justifyContent    : 'center',
        alignItems        : 'center',
        borderBottomWidth : 1,
        borderBottomColor : '#ECECEC',
        paddingVertical   : 20
    },
    forPayment : {
        fontSize    : 20,
        marginRight : 5
    },
    iconButton : {
        width           : 42,
        height          : 42,
        borderRadius    : 8,
        backgroundColor : colors[mode].PRIMARY,
        justifyContent  : 'center',
        alignItems      : 'center'
    },
    callButton: {
        width           : 56,
        height          : 56,
        borderRadius    : 8,
        backgroundColor : colors[mode].GREEN,
        justifyContent  : 'center',
        alignItems      : 'center'
    },
    item : {
        flexDirection  : 'row',
        justifyContent : 'space-between'
    }
});
