import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class GradientHelper extends Component {
  render() {
    const {
      style,
      color1,
      color2,
      startX,
      startY,
      endX,
      endY,
      children,
    } = this.props;
    return (
      <LinearGradient
        colors={[color1, color2]}
        start={{
          x: startX,
          y: startY,
        }}
        end={{
          x: endX,
          y: endY,
        }}
        style={style}
      >
        {children}
      </LinearGradient>
    );
  }
}

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

export default class AnimatedGradient extends Component {
  constructor(props) {
    super(props);

    const { colors, orientation } = props;
    this.state = {
      prevColors: colors,
      prevOrientation: orientation,
      colors,
      orientation,
      tweener: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { colors: prevColors, orientation: prevOrientation } = state;
    const { colors, orientation } = props;
    const tweener = new Animated.Value(0);
    return {
      prevColors,
      prevOrientation,
      colors,
      orientation,
      tweener,
    };
  }

  componentDidUpdate(prevProps) {
    // if (!prevProps.isSubmitting && this.props.isSubmitting) {
      const { tweener } = this.state;
      Animated.timing(tweener, {
        toValue: 1,
      }).start();
    // }

    // if (prevProps.isSubmitting && !this.props.isSubmitting) {
    //   const { tweener } = this.state;
    //   Animated.timing(tweener, {
    //     toValue: 0,
    //   }).start();
    // }
  }

  interpolate(outputRange) {
    return this.state.tweener.interpolate({
      inputRange: [0, 1],
      outputRange: outputRange,
    });
  }

  render() {
    const {
      tweener,
      prevColors,
      prevOrientation,
      colors,
      orientation,
    } = this.state;

    const { style, children } = this.props;

    // orientation interpolations
    const startXInterpolation = this.interpolate([
      prevOrientation.start.x,
      orientation.start.x,
    ]);

    const startYInterpolation = this.interpolate([
      prevOrientation.start.y,
      orientation.start.y,
    ]);

    const endXInterpolation = this.interpolate([
      prevOrientation.end.x,
      orientation.end.x,
    ]);

    const endYInterpolation = this.interpolate([
      prevOrientation.end.y,
      orientation.end.y,
    ]);

    return (
      <AnimatedGradientHelper
        style={style}
        color1={colors[0]}
        color2={colors[1]}
        startX={startXInterpolation}
        startY={startYInterpolation}
        endX={endXInterpolation}
        endY={endYInterpolation}
      >
        {children}
      </AnimatedGradientHelper>
    );
  }
}
