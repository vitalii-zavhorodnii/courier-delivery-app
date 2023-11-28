import React, { PureComponent } from 'react';
import { Text } from 'react-native-elements';

class CustomText extends PureComponent {
    render() {
        return (
            <Text {...this.props} />
        );
    }
}

export default CustomText;
