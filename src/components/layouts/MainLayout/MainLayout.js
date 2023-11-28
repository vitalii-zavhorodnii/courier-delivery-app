import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import * as sessionActions from '../../../store/actions/session';
import colors from '../../../assets/constants/colors';
import screens from '../../../assets/constants/screens';
import LoadingIndicator from '../../ui-kit/LoadingIndicator';
import SnackBar from '../../ui-kit/SnackBar';
import style from './MainLayoutStyles';

class MainLayout extends PureComponent {
    static propTypes = {
        children       : PropTypes.func.isRequired,
        isSessionExist : PropTypes.bool.isRequired,
        checkSession   : PropTypes.func.isRequired,
        colorMode      : PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            initialRoute : screens.MAIN
        };

        this.appState = 'active';
        this.appStateListener = null;
    }

    componentDidMount() {
        const { checkSession } = this.props;

        checkSession();
    }

    render() {
        const { children, isSessionExist, colorMode } = this.props;
        const { initialRoute } = this.state;
        const styles = style(colorMode);

        if (!isSessionExist) {
            return <LoadingIndicator />;
        }

        return (
            <SafeAreaView style={styles.container} edges={[ 'bottom' ]}>
                <SnackBar />

                <StatusBar
                    barStyle='dark-content'
                    backgroundColor={colors[colorMode].BACKGROUND_SECONDARY}
                    translucent
                />

                <View style={styles.container}>
                    {children({ initialRoute })}
                </View>
            </SafeAreaView>
        );
    }
}

export default connect(
    state => ({
        isSessionExist : state.session.isSessionExist,
        colorMode      : state.theme.mode
    }),
    { ...sessionActions }
)(MainLayout);
