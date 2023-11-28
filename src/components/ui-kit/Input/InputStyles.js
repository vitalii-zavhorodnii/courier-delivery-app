import {StyleSheet} from 'react-native';

import colors from '../../../assets/constants/colors';

export default mode =>
  StyleSheet.create({
    container: {
      width: '100%',
      position: 'relative',
    },
    input: {
      width: '100%',
      borderRadius: 5,
      fontSize: 16,
      paddingHorizontal: 20,
    },
    rightIconStyles: {
      position: 'absolute',
      zIndex: 1,
      bottom: 10,
      right: 15,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 20,
    },
    error: {
      color: colors[mode].ERROR,
      marginTop: 5,
    },
  });
