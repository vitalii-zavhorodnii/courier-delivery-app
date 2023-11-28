import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Text from '../Text';
import componentStyles from './ButtonGroupStyles';

class CustomButtonGroup extends PureComponent {
    static propTypes = {
        items         : PropTypes.array.isRequired,
        style         : PropTypes.object,
        titleStyle    : PropTypes.object,
        selectedIndex : PropTypes.number,
        colorMode     : PropTypes.string.isRequired
    };

    static defaultProps = {
        selectedIndex : 0,
        style         : {},
        titleStyle    : {}
    };

    renderButtons = () => {
        const { selectedIndex, items, style, titleStyle, colorMode } = this.props;
        const buttons = items.map(el => ({ text: el }));

        const styles = componentStyles(colorMode);

        return buttons.map((el, index) => {
            const isButtonActive = index === selectedIndex;

            return (
                <TouchableOpacity
                    key={el.text}
                    style={{ ...styles.container, ...style }}
                >
                    <TouchableOpacity style={styles.containerStyle}>
                        {isButtonActive && (
                            <View style={styles.button} />
                        )}

                    </TouchableOpacity>

                    <Text
                        style={{ ...styles.title, ...titleStyle }}
                    >
                        {el.text}
                    </Text>
                </TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <>
                {this.renderButtons()}
            </>
        );
    }
}

export default connect(
    state => ({
        colorMode : state.theme.mode
    })
)(CustomButtonGroup);
