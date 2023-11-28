import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {withTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import ButtonGroup from '../../../ui-kit/ButtonGroup/ButtonGroup';
import OrderHeader from '../../../ui-kit/OrderHeader';
import Text from '../../../ui-kit/Text';
import style from './OrderStyles';

class Order extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    colorMode: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  renderAdress = () => {
    const {
      t,
      colorMode,
      item: {
        address: {apartment, city, entrance, floor, home, street},
      },
    } = this.props;

    const styles = style(colorMode);

    return (
      <View style={styles.address}>
        <Text style={styles.addressText}>
          {city && city}
          {street && `, ${street}`}
          {home && `, ${t('Дом').toLowerCase()} ${home}`}
          {apartment && `, ${t('Квартира').toLowerCase()} ${apartment}`}
          {entrance && `, ${t('Подъезд').toLowerCase()} ${entrance}`}
          {floor && `, ${t('Этаж').toLowerCase()} ${floor}`}
        </Text>
      </View>
    );
  };

  renderFooter = () => {
    const {colorMode, item, t} = this.props;
    const {payment, bonusesPayment} = item;
    const styles = style(colorMode);

    const paymentText = payment
      ? `${payment.sum} грн.`
      : t('Данные об оплате отсутствуют');

    if (!payment) {
      return (
        <View style={styles.footer}>
          <View />

          <Text style={styles.sum}>{t('Данные об оплате отсутствуют')}</Text>
        </View>
      );
    }

    return (
      <View style={styles.footer}>
        <ButtonGroup items={[payment.title]} titleStyle={styles.paymentTitle} />

        <Text style={styles.sum}>{paymentText}</Text>
      </View>
    );
  };

  render() {
    const {colorMode, onPress, item} = this.props;

    const styles = style(colorMode);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.container}>
        <OrderHeader item={item} colorMode={colorMode} />

        {this.renderAdress()}
        {this.renderFooter()}
      </TouchableOpacity>
    );
  }
}

export default connect(state => ({
  colorMode: state.theme.mode,
}))(withTranslation()(Order));
