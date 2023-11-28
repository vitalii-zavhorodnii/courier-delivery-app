import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {withTranslation} from 'react-i18next';
import {Alert, Linking, ScrollView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import * as ordersActions from '../../../store/actions/orders';
import colors from '../../../assets/constants/colors';
import MarkerIcon from '../../../assets/icons/marker.svg';
import PhoneIcon from '../../../assets/icons/phone.svg';
import {isAndroid} from '../../../utils/platform';
import TrackingManager from '../../../utils/TrackingManager';
import Button from '../../ui-kit/Button';
import ButtonGroup from '../../ui-kit/ButtonGroup';
import Icon from '../../ui-kit/Icon';
import OrderHeader from '../../ui-kit/OrderHeader';
import Text from '../../ui-kit/Text';
import style from './OrderScreenStyles';

class OrderScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isDeliveryStarted: PropTypes.bool.isRequired,
    colorMode: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    closeOrder: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.renderHeader();
  }

  handleBackPress = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  handleOpenMap = () => {
    const {
      route: {params},
    } = this.props;
    const {
      item: {address},
    } = params;
    const {city, street, home} = address;
    const androidQuery = `${city}+${street.replace(' ', '')}+${home}`;
    const iosQuery = `${city},${street.replace(' ', '+')},${home}`;
    const androidUrl = `https://www.google.com/maps/search/?api=1&query=${androidQuery}`;
    const iosUrl = `http://maps.apple.com/?address=${iosQuery}`;

    if (isAndroid) {
      Linking.openURL(androidUrl);
    } else {
      Linking.openURL(iosUrl);
    }
  };

  handlePhonePress = phone => () => Linking.openURL(`tel:${phone}`);

  handleCloseOrder = () => {
    const {
      navigation,
      route: {params},
      closeOrder,
    } = this.props;
    const {
      item: {order_uuid, restaurant},
    } = params;

    TrackingManager.getLocation(({latitude, longitude}) => {
      this.setState({isLoading: true}, async () => {
        await closeOrder(order_uuid, restaurant, latitude, longitude);

        this.setState({isLoading: false}, navigation.goBack());
      });
    });
  };

  renderContacts = () => {
    const {colorMode, route} = this.props;
    const {
      item: {
        customer: {name, phone},
      },
    } = route.params;

    const styles = style(colorMode);

    return (
      <TouchableOpacity onPress={this.handlePhonePress(phone)}>
        <Text style={{marginBottom: 10}}>{name}</Text>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{marginBottom: 10}}>{phone}</Text>

          <View style={styles.iconButton}>
            <PhoneIcon />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderPayment = () => {
    const {colorMode, route, t} = this.props;
    const {item} = route.params;
    const {payment} = item;
    const styles = style(colorMode);

    if (!payment) {
      return <Text>{t('Данные об оплате отсутствуют')}</Text>;
    }

    return (
      <View style={styles.payment}>
        <ButtonGroup items={[payment.title]} titleStyle={styles.paymentTitle} />

        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          {payment.prepareChangeFrom !== null ? (
            <>
              <Text style={{marginRight: 5, fontSize: 14}}>
                {t('Потрібна решта')}
              </Text>
              <Text style={styles.sum}>
                {`${payment.prepareChangeFrom - payment.sum} грн.`}
              </Text>
            </>
          ) : null}
        </View>
      </View>
    );
  };

  renderAdress = () => {
    const {colorMode, t, route} = this.props;
    const {
      item: {
        address: {apartment, city, entrance, floor, home, street},
      },
    } = route.params;

    const styles = style(colorMode);

    return (
      <TouchableOpacity onPress={this.handleOpenMap} style={styles.address}>
        <Text style={styles.addressText}>
          {city ? city : null}
          {street ? `, ${street}` : null}
          {home ? `, ${t('Дом').toLowerCase()} ${home}` : null}
          {apartment ? `, ${t('Квартира').toLowerCase()} ${apartment}` : null}
          {entrance ? `, ${t('Подъезд').toLowerCase()} ${entrance}` : null}
          {floor ? `, ${t('Этаж').toLowerCase()} ${floor}` : null}
        </Text>

        <View style={styles.iconButton}>
          <MarkerIcon />
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    const {navigation, user, colorMode} = this.props;
    const styles = style(colorMode);

    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity activeOpacity={0.7} onPress={this.handleBackPress}>
            <Icon
              name={'arrow-left'}
              type={'feather'}
              color={colors[colorMode].PRIMARY}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        );
      },
      headerRight: () => (
        <Text style={styles.headerRight} numberOfLines={1}>
          {user?.phone}
        </Text>
      ),
    });
  };

  renderOrderList = () => {
    const {route, colorMode} = this.props;
    const {items} = route.params.item;

    const styles = style(colorMode);

    return items.map((el, index) => {
      const {amount, name, sum} = el;

      return (
        <View key={index} style={styles.item}>
          <Text>{name}</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>{`${amount} шт.`}</Text>

            <Text
              style={{
                color: colors[colorMode].PRIMARY,
                marginLeft: 5,
              }}>
              {`${sum} грн.`}
            </Text>
          </View>
        </View>
      );
    });
  };

  render() {
    const {isLoading} = this.state;
    const {colorMode, t, route, isDeliveryStarted} = this.props;
    const {item} = route.params;
    const {comment, payment, bonusesPayment} = item;
    const styles = style(colorMode);

    const paymentText = payment
      ? `${payment.sum} грн.`
      : t('Данные об оплате отсутствуют');

    // const paymentText = payment
    //   ? bonusesPayment && payment.code !== 'VISA'
    //     ? `${payment.sum - bonusesPayment.sum} грн.`
    //     : `${payment.sum} грн.`
    //   : t('Данные об оплате отсутствуют');

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.blockTitle}>{t('Время заказа')}</Text>

          <OrderHeader item={item} colorMode={colorMode} />
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>{t('Адрес')}</Text>

          {this.renderAdress()}
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>{t('Контакты')}</Text>

          {this.renderContacts()}
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>{t('Тип оплаты')}</Text>

          {this.renderPayment()}
        </View>

        <View
          style={{
            ...styles.paymentTotal,
            ...(!payment && {justifyContent: 'space-between'}),
          }}>
          <Text style={styles.forPayment}>{t('К оплате')}</Text>

          <Text
            style={{
              ...styles.forPayment,
              color: colors[colorMode].PRIMARY,
              ...(!payment && {fontSize: 14}),
            }}>
            {paymentText}
          </Text>
        </View>

        <View style={{...styles.block, borderBottomWidth: 0}}>
          {isDeliveryStarted ? (
            <View style={styles.startButton}>
              <Button
                title={t('Закрыть заказ')}
                onPress={this.handleCloseOrder}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          ) : null}

          <View style={styles.block}>
            <Text style={styles.blockTitle}>{t('Состав заказа')}</Text>

            {this.renderOrderList()}
          </View>
        </View>

        {comment ? (
          <View>
            <Text style={styles.blockTitle}>{t('Комментарий')}</Text>

            <Text style={styles.addressText}>{comment}</Text>
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    colorMode: state.theme.mode,
    isDeliveryLoading: state.orders.isDeliveryLoading,
    isDeliveryStarted: state.orders.isDeliveryStarted,
    user: state.user.user,
  }),
  {...ordersActions},
)(withTranslation()(OrderScreen));
