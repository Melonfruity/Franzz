"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinaryCore = require("cloudinary-core");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CLOUDINARY_REACT_PROPS = {
  includeOwnBody: true
}; // Map Cloudinary props from array to object for efficient lookup

var CLOUDINARY_PROPS = _cloudinaryCore.Transformation.PARAM_NAMES.map(_cloudinaryCore.Util.camelCase).reduce(function (accumulator, cloudinaryPropName) {
  accumulator[cloudinaryPropName] = true;
  return accumulator;
}, {});

var isDefined = function isDefined(props, key) {
  return props[key] !== undefined && props[key] !== null;
};
/**
 * Extracts cloudinaryProps and nonCloudinaryProps from given props
 *
 * @param props
 * @returns {{children: *, cloudinaryReactProps: {}, cloudinaryProps: {}, nonCloudinaryProps: {}}}
 */


var _default = function _default(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  var result = {
    children: children,
    cloudinaryProps: {},
    nonCloudinaryProps: {},
    cloudinaryReactProps: {}
  };
  Object.keys(props).forEach(function (key) {
    var camelKey = _cloudinaryCore.Util.camelCase(key);

    var value = props[key]; //if valid and defined add to cloudinaryProps

    if (CLOUDINARY_PROPS[camelKey]) {
      if (isDefined(props, key)) {
        result.cloudinaryProps[camelKey] = value;
      }
    } else if (CLOUDINARY_REACT_PROPS[camelKey]) {
      //cloudinary-react spesific prop
      result.cloudinaryReactProps[camelKey] = value;
    } else {
      //not valid so add to nonCloudinaryProps
      result.nonCloudinaryProps[key] = value;
    }
  });
  return result;
};

exports["default"] = _default;