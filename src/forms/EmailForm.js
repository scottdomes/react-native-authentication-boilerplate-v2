import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { setToken } from '../api/token';
import CustomButton from '../forms/Button';
import LinearGradient from 'react-native-linear-gradient';
const colors = ['#FC466B', '#3F5EFB'];

const useValidatedField = (defaultValue, validators) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState('');

  const validateField = () => {
    setError('');
    validators.some((validator) => {
      const err = validator(value);

      if (err) {
        setError(err);
        return true;
      }
    });
  };

  return [value, setValue, validateField, error];
};

const AnimatedForm = ({ children, onSubmit, buttonText }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    setErrorMessage('');
    Animated.timing(opacity, { toValue: 0.2, duration: 200 }).start();
    return onSubmit()
      .then(() => {
        setSubmitting(false);
        Animated.timing(opacity, { toValue: 1, duration: 200 }).start();
      })
      .catch((res) => {
        setSubmitting(false);
        Animated.timing(opacity, { toValue: 1, duration: 200 }).start();

        if (res && res.error) {
          setErrorMessage(res.error);
        }

        setErrorMessage('Something went wrong.');
      });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.error}>{errorMessage}</Text>
      <View style={styles.formInner}>
        {isSubmitting && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color={colors[1]} />
          </View>
        )}
        <Animated.View style={{ opacity }}>{children}</Animated.View>
      </View>
      <CustomButton onPress={submit} title={buttonText} />
    </View>
  );
};

const Field = ({
  label,
  keyboardType = 'default',
  onChangeText,
  value,
  secureTextEntry = false,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <LinearGradient
        colors={colors}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 0,
        }}
        style={styles.inputGradient}
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
      </LinearGradient>
      <Text>{error}</Text>
    </View>
  );
};

const EmailForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
  const validateContent = (text) => {
    if (!text) {
      return "Can't be blank";
    }
  };

  const validateLength = (text) => {
    if (text && text.length < 4) {
      return 'Must be 4 characters or more.';
    }
  };
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

  const submit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        validateEmail();
        validatePassword();
        reject();
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
  label: {},
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'white',
  },
  inputGradient: {
    padding: 3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  formInner: {
    position: 'relative',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginBottom: 20
  }
});

export default EmailForm;
