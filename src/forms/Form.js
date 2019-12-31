import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const Form = ({ fields }) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  return fieldKeys.map((key) => {
    const field = fields[key];
    return (
      <View key={key}>
        <Text>{field.label}</Text>
        <TextInput
          {...field.inputProps}
          value={values[key]}
          onChangeText={(text) => onChangeValue(key, text)}
        />
      </View>
    );
  });
};

export default Form;
