/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types';
import React, { createRef, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as sessionActions from '../../../store/actions/session';
import { parseLoginPhone } from '../../../utils/helpers/parsers';
import { decodeErrorObject, validateCreateSession } from '../../../utils/validation';
import { withKeyboardEvents } from '../../hoc/withKeyboardEvents';
import screens from '../../../assets/constants/screens';
import Button from '../../ui-kit/Button';
import ButtonDemo from '../../ui-kit/ButtonDemo';
import Input from '../../ui-kit/Input';
import Text from '../../ui-kit/Text';
import style from './LoginScreenStyles';

const PHONE_MASK = [
  '+',
  '3',
  '8',
  ' ',
  '(',
  /\d/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/
];

class LoginScreen extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    colorMode: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
      isLoading: false,
      errors: {},
      isFormValid: false
    };

    this.phone = createRef();
    this.password = createRef();

    this.inputs = [this.phone, this.password];
  }

  handleChange = (key, value) => {
    const errors = { ...this.state.errors };

    this.setState({ [key]: value });

    this.setErrors({ ...errors, [key]: void 0 });
    this.setIsFormValid(true);
  };

  handleSubmitEditing = (i) => () => {
    if (this.inputs[i + 1]) {
      this.inputs[i + 1].current.focus();
    } else {
      this.handleValidateForm();
    }
  };

  handleValidateForm = () => {
    const { phone, password } = this.state;
    const { login } = this.props;
    const parsedPhone = parseLoginPhone(phone);

    validateCreateSession({
      data: {
        phone: parsedPhone,
        password
      },
      onSuccess: async (validData) => {
        this.setIsLoading(true);

        await login({
          ...validData,
          // onSuccess: () => {},
          onError: () => {
            const error = decodeErrorObject({ phone: 'INVALID_LOGIN_DATA' });

            this.setErrors(error);
            this.setIsFormValid(false);
            this.setIsLoading(false);
          }
        });
      },
      onError: (errors) => {
        this.setErrors(errors);
        this.setIsFormValid(false);
      }
    });
  };

  handleTestAccout = () => {
    const { navigation } = this.props;

    navigation.navigate(screens.DEMO, {
      title: `№${9379992}`
    });
  };

  handleTestScreen = () => {
    const { navigation } = this.props;

    navigation.navigate(screens.STATISTIC, {
      title: 'Статистика'
    });
  };

  setIsLoading = (isLoading) => this.setState({ isLoading });

  setErrors = (errors) => this.setState({ errors });

  setIsFormValid = (isFormValid) => this.setState({ isFormValid });

  render() {
    const { isLoading, phone, password, errors } = this.state;
    const { colorMode, t } = this.props;
    const styles = style(colorMode);

    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff' }}>Smaki Delivery App v0.31</Text>
        <View style={styles.form}>
          <Text style={styles.title}>{t('Авторизация')}</Text>

          <Input
            ref={this.phone}
            style={styles.input}
            value={phone}
            name="phone"
            mask={PHONE_MASK}
            placeholder={'+38 (XXX) XXX-XX-XX'}
            error={errors.phone}
            mode="light"
            keyboardType="phone-pad"
            onChange={this.handleChange}
            onSubmitEditing={this.handleSubmitEditing(0)}
            blurOnSubmit={false}
            returnKeyType="next"
            colorMode={colorMode}
          />

          <Input
            ref={this.password}
            style={{ ...styles.input, marginBottom: 25 }}
            value={password}
            name="password"
            placeholder="Пароль"
            error={errors.password}
            mode="light"
            onChange={this.handleChange}
            onSubmitEditing={this.handleValidateForm}
            returnKeyType="go"
            blurOnSubmit={false}
            secureTextEntry
            colorMode={colorMode}
          />

          <Button
            title={t('Войти')}
            onPress={this.handleValidateForm}
            loading={isLoading}
            disabled={isLoading}
          />

          <ButtonDemo
            title={'Демо аккаунт'}
            onPress={this.handleTestAccout}
            loading={isLoading}
          />
        </View>
      </View>
    );
  }
}

export default withKeyboardEvents(
  connect(
    (state) => ({
      colorMode: state.theme.mode
    }),
    { ...sessionActions }
  )(withTranslation()(LoginScreen))
);
