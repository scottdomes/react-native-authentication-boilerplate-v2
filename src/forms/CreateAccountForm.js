import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, View } from 'react-native';
import { setToken } from '../api/token';
import Field from './Field';
import {
  useValidatedField,
  validateContent,
  validateLength,
} from './validators';
import AnimatedForm from './AnimatedForm';
import CustomButton from '../forms/Button';

const getInitialState = (fields) => {
  const state = {};
  Object.keys(fields).forEach((key) => {
    state[key] = '';
  });

  return state;
};

const Form = ({ fields, buttonText }) => {
  const [values, setValues] = useState(getInitialState(fields));
  const [errors, setErrors] = useState(getInitialState(fields));
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  const submit = () => {
    console.log(values);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  return (
    <View style={styles.container}>
      {Object.keys(fields).map((key) => {
        const field = fields[key];
        console.log(field);
        return (
          <Field
            key={key}
            value={values[key]}
            onChangeText={(text) => onChangeValue(key, text)}
            error={errors[key]}
            isSubmitting={isSubmitting}
            {...field}
          />
        );
      })}
      <CustomButton onPress={submit} title={buttonText} />
    </View>
  );
};

const CreateAccountForm = ({
  buttonText,
  onSubmit,
  children,
  onAuthentication,
}) => {
  return (
    <Form
      buttonText="Complete"
      fields={{
        firstName: {
          label: 'First name',
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateAccountForm;
