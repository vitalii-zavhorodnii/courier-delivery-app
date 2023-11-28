import { StyleSheet } from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode => StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : colors[mode].BACKGROUND,
        justifyContent  : 'space-between'
    },
    content : {
        width      : '100%',
        alignItems : 'center'
    },
    text : {
        fontSize     : 20,
        color        : colors[mode].TEXT_PRIMARY,
        width        : '100%',
        marginBottom : 10
    },
    settingsButton : {
        marginTop         : 20,
        alignItems        : 'center',
        paddingVertical   : 10,
        paddingHorizontal : 40
    },
    settingsButtonText : {
        color      : colors[mode].PRIMARY,
        fontWeight : 'bold',
        fontSize   : 20
    },
    emptyContainer : {
        flex       : 1,
        alignItems : 'center',
        paddingTop : 25
    },
    emptyText : {
        fontSize  : 16,
        color     : colors[mode].TEXT_SECONDARY,
        textAlign : 'center'
    },
    headerRight : {
        marginRight : 20,
        fontWeight  : 'bold',
        color       : colors[mode].PRIMARY
    },
    listContent : {
        paddingHorizontal : 20,
        paddingTop        : 20
    },
    startButton : {
        backgroundColor : '#FFFFFF',
        padding         : 20
    }
});
