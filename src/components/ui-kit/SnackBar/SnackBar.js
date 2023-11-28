import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { LayoutAnimation, UIManager, View } from 'react-native';
import { connect } from 'react-redux';

import Text from '../Text';
import style from './SnackBarStyles';

const INITIAL_TOP = -60;
const INITIAL_OPACITY = 0;

const VISIBLE_TOP = 35;
const VISIBLE_OPACITY = 1;

class SnackBar extends PureComponent {
    static propTypes = {
        message   : PropTypes.string.isRequired,
        colorMode : PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            top     : INITIAL_TOP,
            opacity : INITIAL_OPACITY
        };
    }

    componentDidMount() {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidUpdate() {
        const { top } = this.state;
        const { message } = this.props;
        const isMessageDidUpdate = (message && top === INITIAL_TOP)
            || (!message && top === VISIBLE_TOP);

        if (isMessageDidUpdate) {
            this.updateTopValue();
        }

        if (message && top === INITIAL_TOP) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }
    }

    updateTopValue = () => {
        const { top } = this.state;
        const { message } = this.props;

        if (message && top < VISIBLE_TOP) {
            this.setState({
                top     : VISIBLE_TOP,
                opacity : VISIBLE_OPACITY
            });
        }

        if (!message && top > INITIAL_TOP) {
            this.setState({
                top     : INITIAL_TOP,
                opacity : INITIAL_OPACITY
            });
        }
    }

    render() {
        const { top, opacity } = this.state;
        const { message, colorMode } = this.props;

        const styles = style(colorMode);

        return (
            <View style={{ ...styles.container, top, opacity }}>
                <Text style={styles.message}>{message}</Text>
            </View>
        );
    }
}

export default connect(state => ({
    message   : state.snackBar.message,
    colorMode : state.theme.mode
}))(SnackBar);
