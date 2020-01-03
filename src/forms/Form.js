import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { validateFields, hasValidationError } from '../forms/validation';
import Field from './Field';
import SubmitButton from './SubmitButton';

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const Form = ({ fields, buttonText, action, afterSubmit }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys),
  );

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);

    if (validationErrors[key]) {
      const newErrors = { ...validationErrors, [key]: '' };
      setValidationErrors(newErrors);
    }
  };

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };

  const submit = async () => {
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);
    if (hasValidationError(errors)) {
      console.log(errors);
      return setValidationErrors(errors);
    }
    const result = await action(...getValues());
    try {
      await afterSubmit(result);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.error}>{errorMessage}</Text>
      {fieldKeys.map((key) => {
        return (
          <Field
            key={key}
            fieldName={key}
            field={fields[key]}
            error={validationErrors[key]}
            onChangeText={onChangeValue}
            value={values[key]}
          />
        );
      })}
      <SubmitButton title={buttonText} onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  error: {
    marginBottom: 20,
    height: 17.5,
  },
});

export default Form;
