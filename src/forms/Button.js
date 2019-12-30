import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from 'react-native';
import AnimatedGradient from '../gradients/AnimatedGradient';

const colors1 = ['#FC466B', '#3F5EFB'];

// start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 0 }}
//     colors={['#12c2e9', '#c471ed', '#f64f59']}

const colors2 = ['#240080', '#DA21B7'];

const colors3 = ['blue', 'red'];

const orientation1 = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

const orientation2 = {
  start: { x: 0, y: 0 },
  end: { x: 5, y: 0 },
};

const orientation3 = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

const Button = ({ title, onPress }) => {
  const [offset] = useState(new Animated.Value(1));
  const [scale] = useState(new Animated.Value(1));
  const [isLoading, setLoading] = useState(false);
  const [orientation, setOrientation] = useState(orientation1);
  const [colors, setColors] = useState(colors1);

  const startLoading = () => {
    setLoading(true);
    setOrientation(orientation2);
    // setColors(colors2);
    setTimeout(() => {
      setLoading(false);
      setOrientation(orientation1);
      Animated.spring(offset, {
        toValue: 0,
      }).start();
      Animated.spring(scale, {
        toValue: 1,
      }).start();
    }, 1000);

    onPress();
  };

  const handlePress = () => {
    Animated.spring(offset, {
      toValue: 5,
    }).start();
    Animated.spring(scale, {
      toValue: 0.96,
    }).start();

    startLoading();
  };

  const transform = [
    { translateY: offset },
    { scaleY: scale },
    { scaleX: scale },
  ];

  return (
    <TouchableWithoutFeedback onPressIn={handlePress}>
      <Animated.View style={{ transform, ...styles.outerContainer }}>
        <AnimatedGradient
          orientation={orientation}
          colors={colors}
          style={styles.linearGradient}
        >
          <View style={styles.container}>
            {isLoading ? (
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
  outerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: 250,
    elevation: 4,
  },
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
  },
  linearGradient: {
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
