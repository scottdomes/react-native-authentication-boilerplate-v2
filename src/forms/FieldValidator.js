const validateField = (validators, value) => {
  let error = '';
  validators.forEach((validator) => {
    const validationError = validator(value);
    if (validationError) {
      error = validationError;
    }
  });
  return error;
};

const validateFields = (fields, values) => {
  const errors = {};
  const fieldKeys = Object.keys(fields);
  fieldKeys.forEach((key) => {
    const field = fields[key];
    const validators = field.validators;
    const value = values[key];
    if (validators && validators.length > 0) {
      const error = validateField(validators, value);
      if (error) {
        errors[key] = error;
      }
    }
  });

  return errors;
};

const FieldValidator = ({ values, fields, children }) => {
  const errors = validateFields(fields, values);

  return children(errors);
};

export default FieldValidator;
