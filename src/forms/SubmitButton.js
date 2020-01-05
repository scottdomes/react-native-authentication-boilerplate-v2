import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
// import AnimatedGradient from './AnimatedGradient';
import { GRADIENT_COLORS } from './constants';

const orientation1 = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

const orientation2 = {
  start: { x: 0, y: 0 },
  end: { x: 5, y: 0 },
};

const SubmitButton = ({ title, onPress, isSubmitting }) => {
  const [offset] = useState(new Animated.Value(1));
  const [scale] = useState(new Animated.Value(1));
  const [orientation, setOrientation] = useState(orientation1);

  const handlePress = async () => {
    setOrientation(orientation2);

    Animated.spring(offset, {
      toValue: 5,
    }).start();
    Animated.spring(scale, {
      toValue: 0.96,
    }).start();

    await onPress();
    setOrientation(orientation1);
    Animated.spring(offset, {
      toValue: 0,
    }).start();
    Animated.spring(scale, {
      toValue: 1,
    }).start();
  };

  const transform = [
    { translateY: offset },
    { scaleY: scale },
    { scaleX: scale },
  ];

  return (
    <TouchableWithoutFeedback onPressIn={handlePress}>
      <Animated.View style={{ transform, ...styles.container }}>
          <View style={styles.container}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.text}>{title}ss</Text>
            )}
          </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#3F5EFB',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: 250,
    elevation: 4,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubmitButton;
