import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Form = ({ fields }) => {
  const fieldKeys = Object.keys(fields);

  return fieldKeys.map((key) => {
    const field = fields[key];
    return (
      <View key={key}>
        <Text>{field.label}</Text>
        <TextInput {...field.inputProps} />
      </View>
    );
  });
};

export default Form;
