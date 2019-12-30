import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { setToken } from '../api/token';
import Field from './Field';
import {
  useValidatedField,
  validateContent,
  validateLength,
} from './validators';
import AnimatedForm from './AnimatedForm';

const animationTimeout = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 500));

const EmailForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
  const [email, onChangeEmail, validateEmail, emailError] = useValidatedField(
    '',
    [validateContent],
  );
  const [
    password,
    onChangePassword,
    validatePassword,
    passwordError,
  ] = useValidatedField('', [validateContent, validateLength]);

  const hasValidationErrors = () => {
    let error = validateEmail();
    error = validatePassword();

    return Boolean(error);
  };

  const validateAndLogin = () => {
    const isValid = !hasValidationErrors();

    if (isValid) {
      return onSubmit(email, password);
    } else {
      return Promise.resolve();
    }
  };

  const submit = () => {
    return Promise.all([animationTimeout(), validateAndLogin()]).then(
      async (res) => {
        const loginResult = res[1]
        if (loginResult && loginResult.data && loginResult.data.auth_token) {
          await setToken(loginResult.data.auth_token);
          onAuthentication();
        }

        if (loginResult && loginResult.status === 401) {
          throw new Error('Invalid login.')
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <AnimatedForm onSubmit={submit} buttonText={buttonText}>
        {(isSubmitting) => {
          return [
            <Field
              key="email"
              value={email}
              onChangeText={onChangeEmail}
              keyboardType="email-address"
              label="Email"
              error={emailError}
              isSubmitting={isSubmitting}
            />,
            <Field
              key="password"
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry
              label="Password"
              error={passwordError}
              isSubmitting={isSubmitting}
            />,
          ];
        }}
      </AnimatedForm>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmailForm;
