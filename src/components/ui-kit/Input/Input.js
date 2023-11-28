/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { forwardRef, PureComponent } from 'react';
import { LayoutAnimation, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import MaskInput from 'react-native-mask-input';

import Icon from '../Icon';
import Text from '../Text';
import inputStyles from './InputStyles';

class Input extends PureComponent {
    static propTypes = {
        forwardedRef : PropTypes.object,
        mode         : PropTypes.string,
        value        : PropTypes.string.isRequired,
        name         : PropTypes.string,
        mask         : PropTypes.array,
        error        : PropTypes.string,
        onChange     : PropTypes.func,
        style        : PropTypes.object,
        inputStyle   : PropTypes.object,
        label        : PropTypes.string,
        multiline    : PropTypes.bool,
        iconRight    : PropTypes.object,
        onPress      : PropTypes.func,
        colorMode    : PropTypes.string.isRequired
    }

    static defaultProps = {
        forwardedRef : {},
        mode         : 'dark',
        style        : {},
        inputStyle   : {},
        mask         : void 0,
        error        : void 0,
        label        : void 0,
        name         : void 0,
        onChange     : void 0,
        multiline    : false,
        iconRight    : void 0,
        onPress      : void 0
    }

    componentDidMount() {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidUpdate(prev) {
        const prevError = prev.error;
        const { error } = this.props;

        if (prevError !== error) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }
    }

    handleChange = value => {
        const { name, onChange } = this.props;

        onChange(name, value);
    }

    handlePress = () => {
        const { onPress } = this.props;

        if (onPress) {
            onPress();
        }
    }

    render() {
        const {
            forwardedRef,
            mode,
            value,
            mask,
            style,
            inputStyle,
            error,
            label,
            multiline,
            iconRight,
            onPress,
            colorMode,
            ...rest
        } = this.props;
        const modeStyles = {
            light : {
                backgroundColor : '#FFFFFF',
                color           : '#000000'
            },
            dark : {
                backgroundColor : '#2D303E',
                color           : '#FFFFFF'
            }
        };

        const styles = inputStyles(colorMode);

        const ContainerComponent = onPress ? TouchableOpacity : View;
        const InputComponent = mask ? MaskInput : TextInput;

        return (
            <ContainerComponent
                activeOpacity={1}
                onPress={this.handlePress}
                style={{
                    ...styles.container,
                    ...style,
                    ...inputStyle
                }}
            >
                {label && (
                    <Text style={styles.label}>{label}</Text>
                )}

                <InputComponent
                    ref={forwardedRef}
                    value={value}
                    {...mask && { mask }}
                    style={{
                        ...styles.input,
                        ...modeStyles[mode],
                        ...!multiline && { height: 46 },
                        ...multiline && { lineHeight: 22, paddingBottom: 15, paddingTop: 10 },
                        ...iconRight && { paddingRight: 40 }
                    }}
                    onChangeText={this.handleChange}
                    multiline={multiline}
                    pointerEvents={onPress ? 'none' : 'auto'}
                    {...rest}
                />

                {iconRight && (
                    <Icon
                        containerStyle={styles.rightIconStyles}
                        {...iconRight}
                    />
                )}

                {error && (
                    <Text style={styles.error}>{error}</Text>
                )}
            </ContainerComponent>
        );
    }
}

// eslint-disable-next-line react/no-multi-comp
export default forwardRef((props, ref) => <Input {...props} forwardedRef={ref} />);

