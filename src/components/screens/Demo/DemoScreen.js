/* eslint-disable no-undef */
/* eslint-disable no-magic-numbers */
/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {withTranslation} from 'react-i18next';
import {
  Alert,
  LayoutAnimation,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

import * as ordersActions from '../../../store/actions/orders';
import * as sessionActions from '../../../store/actions/session';
import colors from '../../../assets/constants/colors';
import screens from '../../../assets/constants/screens';
import Toast from '../../../utils/Toast';
import TrackingManager from '../../../utils/TrackingManager';
import Button from '../../ui-kit/Button';
import Icon from '../../ui-kit/Icon';
import LoadingIndicator from '../../ui-kit/LoadingIndicator';
import Text from '../../ui-kit/Text';
import Order from './Order';
import style from './DemoScreenStyles';
import orders from './test-order';

class DemoScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    initializeOrders: PropTypes.func.isRequired,
    startDelivery: PropTypes.func.isRequired,
    orders: PropTypes.array,
    isDeliveryStarted: PropTypes.bool.isRequired,
    isDeliveryLoading: PropTypes.bool.isRequired,
    isPermissionGranted: PropTypes.bool.isRequired,
    locationPermissionStatus: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    colorMode: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    orders: orders,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      refreshing: false,
    };

    this.interval = null;
  }

  componentDidMount() {
    const {initializeOrders} = this.props;

    this.renderHeader();
    initializeOrders();

    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.interval = setInterval(() => {
      initializeOrders();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleStartPress = () => {
    const {orders, startDelivery, isPermissionGranted, t} = this.props;
    const mappedOrders = orders.map(this.mapOrder);
    const {delivery_terminal_id} = orders[0];

    requestAnimationFrame(() => {
      if (!isPermissionGranted) {
        this.handleShowPermissionError();
      } else {
        startDelivery({
          orders: mappedOrders,
          delivery_terminal_id,
          onError: console.log('error'),
        });
      }
    });
  };

  handleShowPermissionError = () => {
    const {t, locationPermissionStatus: status} = this.props;
    const ALERT_CONFIG = {
      blocked: [
        t('Службы геолокации выключены'),
        t('Необходимо включить службы геолокации в настройках смартфона'),
      ],
      denied: [
        t('Службы геолокации выключены'),
        t('Нажмите ОК чтобы включить службы геолокации'),
        [
          {
            text: 'OK',
            onPress: TrackingManager.initialize,
          },
          {text: t('Отмена')},
        ],
      ],
    };

    Alert.alert(...ALERT_CONFIG[status]);
  };

  handleRefresh = () => {
    const {initializeOrders} = this.props;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    this.setState({refreshing: true}, async () => {
      await initializeOrders({
        onSuccess: () => {
          setTimeout(() => {
            this.setState({refreshing: false});
          }, 2000);
        },
      });
    });
  };

  handleLogout = () => {
    const {navigation} = this.props;
    navigation.navigate(screens.LOGIN);
  };

  handleOrderPress = item => () => {
    const {navigation} = this.props;
    const {order_id} = item;

    navigation.navigate(screens.ORDER, {
      title: `№${order_id}`,
      item,
    });
  };

  getKeyExtractor = item => item.order_uuid;

  mapOrder = order => {
    
    const {restaurant, order_uuid, address} = order;

    return {restaurant, order_uuid, address};
  };

  renderHeader = () => {
    const {navigation, colorMode, t} = this.props;
    const styles = style(colorMode);

    navigation.setOptions({
      title: t('Список заказов'),
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={this.handleLogout}>
            <Icon
              name={'log-out'}
              type={'feather'}
              color={colors[colorMode].PRIMARY}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        );
      },
    });
  };

  renderRefreshControl = () => {
    const {refreshing} = this.state;
    const {colorMode, t} = this.props;
    const options = Platform.select({
      ios: {
        tintColor: colors[colorMode].PRIMARY,
        title: t('Обновление списка заказов'),
        titleColor: colors[colorMode].PRIMARY,
      },
      android: {
        colors: [colors[colorMode].PRIMARY],
        progressBackgroundColor: colors[colorMode].BACKGROUND_SECONDARY,
      },
    });

    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
        {...options}
      />
    );
  };

  renderEmptyScreen = () => {
    const {refreshing} = this.state;
    const {colorMode, t} = this.props;
    const styles = style(colorMode);

    return (
      <ScrollView
        contentContainerStyle={styles.emptyContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={this.renderRefreshControl()}>
        {!refreshing && (
          <Text style={styles.emptyText}>{t('Ожидание заказа')}</Text>
        )}
      </ScrollView>
    );
  };

  renderOrder = ({item}) => {
    return <Order item={item} onPress={this.handleOrderPress(item)} />;
  };

  render() {
    const {isDeliveryStarted, isDeliveryLoading, colorMode, t} = this.props;
    const styles = style(colorMode);

    if (!orders) {
      return <LoadingIndicator />;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={orders}
          keyExtractor={this.getKeyExtractor}
          renderItem={this.renderOrder}
          contentContainerStyle={styles.listContent}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    orders: state.orders.orders,
    isDeliveryStarted: state.orders.isDeliveryStarted,
    isDeliveryLoading: state.orders.isDeliveryLoading,
    isPermissionGranted: state.location.isPermissionGranted,
    locationPermissionStatus: state.location.locationPermissionStatus,
    colorMode: state.theme.mode,
  }),
  {...ordersActions, ...sessionActions},
)(withTranslation()(DemoScreen));
