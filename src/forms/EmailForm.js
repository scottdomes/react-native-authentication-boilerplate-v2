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

const AnimatedForm = ({ children, onSubmit, buttonText }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = () => {
    setSubmitting(true);
    Animated.timing(opacity, { toValue: 0.2, duration: 200 }).start();
    onSubmit()
      .then(() => {
        setSubmitting(false);
        Animated.timing(opacity, { toValue: 1, duration: 200 }).start();
      })
      .catch((res) => {
        if (res && res.error) {
          setErrorMessage(res.error);
        }

        setErrorMessage('Something went wrong.');
      });
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formInner}>
        {isSubmitting && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color={colors[1]} />
          </View>
        )}
        <Animated.View style={{ opacity }}>{children}</Animated.View>
      </View>
      <CustomButton onPress={submit} title={buttonText} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

const Field = ({
  label,
  keyboardType = 'default',
  onChangeText,
  value,
  secureTextEntry = false,
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
    </View>
  );
};

const EmailForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const submit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
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
        />
        <Field
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          label="Password"
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
    marginTop: 20,
    backgroundColor: 'white',
    marginTop: 0,
  },
  inputGradient: {
    padding: 3,
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
});

export default EmailForm;
