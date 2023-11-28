/* eslint-disable no-magic-numbers */
import React from 'react';
import { Keyboard, LayoutAnimation, Pressable, UIManager, View } from 'react-native';

import { isIOS } from '../../utils/platform';

export function withKeyboardEvents(
    Component,
    useLayoutAnimation = true,
    withPressOutside = true,
    isContentMustBeVisible = true
) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.handleKeyboardShow = this.handleKeyboardShow.bind(this);
            this.handleKeyboardHide = this.handleKeyboardHide.bind(this);

            this.state = {
                isKeyboardVisible : false,
                startCoordinates  : 0,
                keyboardHeight    : 0
            };
        }

        componentDidMount() {
            if (isIOS) {
                Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
                Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
            } else {
                Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow);
                Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide);
            }
        }

        componentWillUnmount() {
            if (isIOS) {
                Keyboard.removeAllListeners([ 'keyboardWillShow', 'keyboardWillHide' ]);
            } else {
                Keyboard.removeAllListeners([ 'keyboardDidShow', 'keyboardDidHide' ]);
            }
        }

        handleKeyboardShow(e) {
            const { height, screenY } = e.endCoordinates;
            const outputHeight = isIOS ? height : height + 25;

            this.configureLayoutAnimation();

            this.setState({
                keyboardHeight    : outputHeight,
                startCoordinates  : screenY,
                isKeyboardVisible : true
            });
        }

        handleKeyboardHide() {
            this.configureLayoutAnimation();
            this.setState({ keyboardHeight: 0, isKeyboardVisible: false });
        }

        handlePressOutside = Keyboard.dismiss;

        configureLayoutAnimation = () => {
            if (useLayoutAnimation) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

                if (UIManager.setLayoutAnimationEnabledExperimental) {
                    UIManager.setLayoutAnimationEnabledExperimental(true);
                }
            }
        }

        render() {
            const { isKeyboardVisible, keyboardHeight, startCoordinates } = this.state;
            const style = isContentMustBeVisible && isIOS
                ? { flex: 1, paddingBottom: keyboardHeight }
                : { flex: 1 };

            if (withPressOutside) {
                return (
                    <Pressable
                        onPress={this.handlePressOutside}
                        style={style}
                    >
                        <Component
                            {...this.props}
                            isKeyboardVisible={isKeyboardVisible}
                            keyboardHeight={keyboardHeight}
                            startCoordinates={startCoordinates}
                        />
                    </Pressable>
                );
            }

            return (
                <View style={style}>
                    <Component
                        {...this.props}
                        isKeyboardVisible={isKeyboardVisible}
                        keyboardHeight={keyboardHeight}
                        startCoordinates={startCoordinates}
                    />
                </View>
            );
        }
    };
}
