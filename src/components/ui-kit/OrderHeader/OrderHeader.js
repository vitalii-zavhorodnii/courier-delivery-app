/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Image, View} from 'react-native';

import DeliveryIcon from '../../../assets/icons/delivery_icon.svg';
import {getDate, getDateDifference} from '../../../utils/helpers/date';
import Text from '../Text';
import style from './OrderHeaderStyles';

class OrderHeader extends PureComponent {
  static propTypes = {
    colorMode: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
  };

  render() {
    const {
      colorMode,
      item: {restaurant, expected_delivery_at},
    } = this.props;

    const restaurantConfig = {
      smaki: {
        logo: require('../../../assets/icons/smaki_logo.png'),
        name: 'Smaki-Maki',
      },
      go: {
        logo: require('../../../assets/icons/go_logo.png'),
        name: 'Sushi GO',
      },
    };

    const {hours, minutes} = getDateDifference(expected_delivery_at);

    const styles = style(colorMode);

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={restaurantConfig[restaurant].logo}
            style={styles.restaurantLogo}
            width={20}
            height={20}
          />

          <Text style={styles.restaurantName}>
            {restaurantConfig[restaurant].name}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <DeliveryIcon style={styles.deliveryIcon} />

          <Text style={styles.expectedDelivery}>
            {getDate(expected_delivery_at, 'HH:mm')}
          </Text>

          {minutes > 0 && (
            <Text style={styles.latetime}>({`+${hours}:${minutes}`})</Text>
          )}
        </View>
      </View>
    );
  }
}

export default OrderHeader;
