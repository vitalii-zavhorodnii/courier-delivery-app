import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

import colors from '../../../assets/constants/colors';
import style from './LoadingIndicatorStyles';

class LoadingIndicator extends PureComponent {
    static propTypes = {
        colorMode : PropTypes.string.isRequired
    };

    render() {
        const { colorMode } = this.props;

        const styles = style(colorMode);

        return (
            <View style={styles.container}>
                <ActivityIndicator
                    color={colors[colorMode].PRIMARY}
                    size='large'
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        colorMode : state.theme.mode
    })
)(LoadingIndicator);
