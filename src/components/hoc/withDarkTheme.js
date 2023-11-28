/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'react-native-elements';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import RootViewBackgroundColor from 'react-native-root-view-background-color';
import SafeAreaViewDecider from 'react-native-smart-statusbar';
import { connect } from 'react-redux';

import * as themeActions from '../../store/actions/theme';
import colors from '../../assets/constants/colors';
import theme from '../../assets/constants/theme';
import { getThemeValueFromStorage } from '../../utils/storage/settingsHelper';

class withDarkTheme extends PureComponent {
  static propTypes = {
    children: PropTypes.object.isRequired,
    updateThemeValue: PropTypes.func.isRequired,
    initializeThemeMode: PropTypes.func.isRequired,
    colorMode: PropTypes.string.isRequired,
    isThemeInitialized: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.initializeTheme();
    this.initializeNavBarTheme();
  }

  componentDidUpdate(prevProps) {
    const prevColorMode = prevProps.colorMode;
    const { colorMode } = this.props;
    const isColorModeChanged = prevColorMode !== colorMode;

    if (isColorModeChanged) {
      this.initializeNavBarTheme();
    }
  }

  initializeTheme = async () => {
    const { updateThemeValue, initializeThemeMode } = this.props;
    const storageThemeMode = await getThemeValueFromStorage();
    const currentThemeMode = storageThemeMode || 'light';

    updateThemeValue(currentThemeMode);
    initializeThemeMode();
  };

  initializeRootViewTheme = () => {
    const { colorMode } = this.props;

    RootViewBackgroundColor.setBackground(colors[colorMode].BACKGROUND_PRIMARY);
  };

  initializeNavBarTheme = () => {
    const { colorMode } = this.props;
    const navBarColor =
      colorMode === 'dark'
        ? colors[colorMode].BACKGROUND_SECONDARY
        : colors[colorMode].TEXT_PRIMARY;

    changeNavigationBarColor(navBarColor);
  };

  renderStatusBar = () => {
    const { colorMode } = this.props;
    const statusBarBackground = colors[colorMode].BACKGROUND_SECONDARY;
    const statusBarStyle = colorMode === 'dark' ? 'light-content' : 'dark-content';

    return (
      <SafeAreaViewDecider
        backgroundColor={statusBarBackground}
        barStyle={statusBarStyle}
      />
    );
  };

  render() {
    const { children, colorMode, isThemeInitialized } = this.props;
    const uiTheme = theme(colorMode);

    if (!isThemeInitialized) {
      return null;
    }

    return (
      <ThemeProvider theme={uiTheme}>
        {this.renderStatusBar()}
        {children}
      </ThemeProvider>
    );
  }
}

export default connect(
  (state) => ({
    colorMode: state.theme.mode,
    isThemeInitialized: state.theme.isInitialized
  }),
  { ...themeActions }
)(withDarkTheme);
