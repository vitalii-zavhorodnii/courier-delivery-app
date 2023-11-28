import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';

import colors from '../../../assets/constants/colors';

class CustomButton extends PureComponent {
  static propTypes = {
    colorMode: PropTypes.string.isRequired,
  };

  static defaultProps = {
    mode: 'primary',
    disabled: false,
  };

  render() {
    const {colorMode} = this.props;

    return (
      <Button
        type="clear"
        style={{color: colors[colorMode].PRIMARY, marginTop: 15}}
        {...this.props}
      />
    );
  }
}

export default connect(
  state => ({
    colorMode: state.theme.mode,
  }),
  null,
)(CustomButton);