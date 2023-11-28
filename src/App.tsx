import 'react-native-gesture-handler';
import './utils/i18n/index';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import WithDarkTheme from './components/hoc/withDarkTheme';
import AuthNavigation from './components/navigation/AuthNavigation';
import store from './store';

const App = () => (
  <NavigationContainer>
    <StoreProvider store={store}>
      <WithDarkTheme>
        <AuthNavigation />
      </WithDarkTheme>
    </StoreProvider>
  </NavigationContainer>
);

export default App;
