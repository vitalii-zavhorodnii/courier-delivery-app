import { StyleSheet } from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode => StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : colors[mode].BACKGROUND_PRIMARY
    }
});
