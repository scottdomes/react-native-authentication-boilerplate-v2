import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { setToken } from '../api/token';
import Field from './Field';
import {
  useValidatedField,
  validateContent,
  validateLength,
} from './validators';
import AnimatedForm from './AnimatedForm';

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

  const submit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isValid = !hasValidationErrors();

        if (isValid) {
          reject();
        } else {
          resolve();
        }
      }, 2000);
    });
    // onSubmit(email, password)
    //   .then(async (res) => {
    //     await setToken(res.auth_token);
    //     onAuthentication();
    //   })
    //   .catch((res) => {
    //     if (res && res.error) {
    //       setErrorMessage(res.error);
    //     }

    //     setErrorMessage('Something went wrong.');
    //   });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnimatedForm onSubmit={submit} buttonText={buttonText}>
        <Field
          value={email}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
          label="Email"
          error={emailError}
        />
        <Field
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          label="Password"
          error={passwordError}
        />
      </AnimatedForm>
      {children}
    </ScrollView>
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
