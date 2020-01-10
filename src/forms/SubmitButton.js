import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import AnimatedGradient from './AnimatedGradient';
import { GRADIENT_COLORS, GRADIENT_ORIENTATIONS } from './constants';

const SubmitButton = ({ title, onPress, isSubmitting }) => {
  const [offset] = useState(new Animated.Value(1));
  const [scale] = useState(new Animated.Value(1));

  const handlePress = async () => {
    Animated.spring(offset, {
      toValue: 5,
    }).start();
    Animated.spring(scale, {
      toValue: 0.96,
    }).start();

    await onPress();
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
        <AnimatedGradient
          isSubmitting={isSubmitting}
          orientations={GRADIENT_ORIENTATIONS}
          orientation={isSubmitting ? GRADIENT_ORIENTATIONS[1] : GRADIENT_ORIENTATIONS[0]}
          colors={GRADIENT_COLORS}
          style={{ borderRadius: 8 }}
        >
          <View style={styles.container}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.text}>{title}</Text>
            )}
          </View>
        </AnimatedGradient>
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
