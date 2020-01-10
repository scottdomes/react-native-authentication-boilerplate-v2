import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class GradientHelper extends Component {
  render() {
    const {
      style,
      colors,
      startX,
      startY,
      endX,
      endY,
      children,
    } = this.props;
    return (
      <LinearGradient
        colors={colors}
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

    const { orientation } = props;
    this.state = {
      prevOrientation: orientation,
      orientation,
      tweener: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { orientation: prevOrientation } = state;
    const { orientation } = props;
    const tweener = new Animated.Value(0);
    return {
      prevOrientation,
      orientation,
      tweener,
    };
  }

  componentDidUpdate(prevProps) {
    const { tweener } = this.state;
    Animated.timing(tweener, {
      toValue: 1,
    }).start();
  }

  interpolate(outputRange) {
    return this.state.tweener.interpolate({
      inputRange: [0, 1],
      outputRange: outputRange,
    });
  }

  render() {
    const { prevOrientation, orientation } = this.state;
    const { style, children, colors } = this.props;

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
        colors={colors}
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
