function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { Animated, Platform } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';
const AnimatedBaseButton = Animated.createAnimatedComponent(BaseButton);
const useNativeDriver = Platform.OS !== 'web';
export default class BorderlessButton extends React.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "opacity", new Animated.Value(1));

    _defineProperty(this, "handleActiveStateChange", active => {
      if (Platform.OS !== 'android') {
        Animated.spring(this.opacity, {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
          toValue: active ? this.props.activeOpacity : 1,
          useNativeDriver
        }).start();
      }

      this.props.onActiveStateChange && this.props.onActiveStateChange(active);
    });
  }

  render() {
    const _this$props = this.props,
          {
      children,
      style,
      enabled
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["children", "style", "enabled"]);

    return React.createElement(AnimatedBaseButton, _extends({}, rest, {
      onActiveStateChange: this.handleActiveStateChange,
      style: [style, Platform.OS === 'ios' && enabled && {
        opacity: this.opacity
      }]
    }), children);
  }

}

_defineProperty(BorderlessButton, "defaultProps", {
  activeOpacity: 0.3,
  borderless: true
});
//# sourceMappingURL=BorderlessButton.js.map