import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';

import colors from '../../assets/constants/colors';
import screens from '../../assets/constants/screens';
import MainLayout from '../layouts/MainLayout';
import Login from '../screens/Login/LoginScreen';
import DemoScreen from '../screens/Demo';
import OrderScreen from '../screens/Order';
import OrdersScreen from '../screens/Orders';
import StatisticScreen from '../screens/Statistic';

const Stack = createStackNavigator();

function stackOptions(colorMode) {
  return {
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: colors[colorMode].TEXT_PRIMARY,
      fontSize: 16
    },
    headerStyle: {
      height: Platform.select({ ios: 50, android: 90 }),
      backgroundColor: colors[colorMode].BACKGROUND_SECONDARY,
      shadowRadius: 1,
      elevation: 1,
      shadowOffset: {
        height: 1
      }
    }
  };
}

function routerOptions({ route }) {
  return {
    title: route.params.title,
    headerTitleAllowFontScaling: false
  };
}

const withoutHeaderOptions = {
  headerShown: false
};

class AuthNavigation extends PureComponent {
  static propTypes = {
    jwt: PropTypes.string.isRequired,
    colorMode: PropTypes.string.isRequired
  };

  render() {
    const { jwt, colorMode } = this.props;

    return (
      <MainLayout>
        {() => (
          <Stack.Navigator
            screenOptions={stackOptions(colorMode)}
            // initialRouteName={initialRoute}
          >
            {jwt ? (
              <>
                <Stack.Screen
                  name={screens.ORDERS}
                  options={stackOptions(colorMode)}
                  component={OrdersScreen}
                />
                <Stack.Screen
                  name={screens.ORDER}
                  options={routerOptions}
                  component={OrderScreen}
                />
                <Stack.Screen
                  name={screens.STATISTIC}
                  options={routerOptions}
                  component={StatisticScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name={screens.LOGIN}
                  options={withoutHeaderOptions}
                  component={Login}
                />
                <Stack.Screen
                  name={screens.DEMO}
                  options={routerOptions}
                  component={DemoScreen}
                />
                <Stack.Screen
                  name={screens.ORDER}
                  options={routerOptions}
                  component={OrderScreen}
                />
                <Stack.Screen
                  name={screens.STATISTIC}
                  options={routerOptions}
                  component={StatisticScreen}
                />
              </>
            )}
          </Stack.Navigator>
        )}
      </MainLayout>
    );
  }
}

export default connect((state) => ({
  jwt: state.session.jwt,
  colorMode: state.theme.mode
}))(AuthNavigation);
