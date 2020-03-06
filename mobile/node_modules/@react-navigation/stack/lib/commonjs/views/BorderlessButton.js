"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const AnimatedBaseButton = _reactNative.Animated.createAnimatedComponent(_reactNativeGestureHandler.BaseButton);

const useNativeDriver = _reactNative.Platform.OS !== 'web';

class BorderlessButton extends React.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "opacity", new _reactNative.Animated.Value(1));

    _defineProperty(this, "handleActiveStateChange", active => {
      if (_reactNative.Platform.OS !== 'android') {
        _reactNative.Animated.spring(this.opacity, {
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
      style: [style, _reactNative.Platform.OS === 'ios' && enabled && {
        opacity: this.opacity
      }]
    }), children);
  }

}

exports.default = BorderlessButton;

_defineProperty(BorderlessButton, "defaultProps", {
  activeOpacity: 0.3,
  borderless: true
});
//# sourceMappingURL=BorderlessButton.js.map