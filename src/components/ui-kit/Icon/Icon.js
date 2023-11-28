import React, { PureComponent } from 'react';
import { Icon } from 'react-native-elements';

class CustomIcon extends PureComponent {
    render() {
        return (
            <Icon {...this.props} />
        );
    }
}

export default CustomIcon;
