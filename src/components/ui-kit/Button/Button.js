import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import colors from '../../../assets/constants/colors';

class CustomButton extends PureComponent {
    static propTypes = {
        mode      : PropTypes.string,
        disabled  : PropTypes.bool,
        colorMode : PropTypes.string.isRequired
    };

    static defaultProps = {
        mode     : 'primary',
        disabled : false
    };

    render() {
        const { mode, disabled, colorMode } = this.props;
        const modeStyles = {
            primary : {
                buttonStyle  : { backgroundColor: colors[colorMode].PRIMARY},
                titleStyle   : { color: colors[colorMode].TEXT_CONTRAST },
                loadingProps : { color: colors[colorMode].TEXT_SECONDARY },
            },
            secondary : {
                buttonStyle : {
                    backgroundColor : 'transparent',
                    borderWidth     : 1,
                    borderColor     : colors[colorMode].PRIMARY
                },
                titleStyle   : { color: colors[colorMode].TEXT_CONTRAST },
                loadingProps : { color: colors[colorMode].PRIMARY }
            },
            disabled : {
                loadingProps : { color: '#848484' }
            }
        };

        const modeStyle = disabled
            ? modeStyles.disabled
            : modeStyles[mode];

        return (
            <Button
                {...modeStyle}
                {...this.props}
            />
        );
    }
}

export default connect(
    state => ({
        colorMode : state.theme.mode
    }),
    null
)(CustomButton);
