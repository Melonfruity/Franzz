"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cloudinaryCore = require("cloudinary-core");

var _CloudinaryContextType = require("../CloudinaryContext/CloudinaryContextType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var camelCase = _cloudinaryCore.Util.camelCase;
/**
 * Return a new object containing keys and values where keys are in the keys list
 * @param {object} source Object to copy values from
 * @param {string[]} [keys=[]] a list of keys
 * @returns {object} an object with copied values
 */

function only(source) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!source) {
    return source;
  }

  return keys.reduce(function (tr, key) {
    if (key in source) {
      tr[key] = source[key];
    }

    return tr;
  }, {});
}
/**
 * A base component for Cloudinary components.
 * @protected
 */


var CloudinaryComponent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CloudinaryComponent, _PureComponent);

  function CloudinaryComponent(props, context) {
    var _this;

    _classCallCheck(this, CloudinaryComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CloudinaryComponent).call(this, props, context));
    _this.getContext = _this.getContext.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CloudinaryComponent, [{
    key: "render",
    value: function render() {
      return null;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.context || {};
    }
  }, {
    key: "getChildTransformations",
    value: function getChildTransformations(children) {
      var _this2 = this;

      if (children === undefined || children === null) return null;

      var mapped = _react["default"].Children.map(children, function (child) {
        if (!_react["default"].isValidElement(child)) {
          // child is not an element (e.g. simple text)
          return;
        }

        var options = {};

        if (child.type && child.type.exposesProps) {
          options = CloudinaryComponent.normalizeOptions(child.props, child.context);
        }

        var childOptions = _this2.getChildTransformations(child.props.children);

        if (childOptions !== undefined && childOptions !== null) {
          options.transformation = childOptions;
        }

        return options;
      });

      if (mapped != null) {
        return mapped.filter(function (o) {
          return !_cloudinaryCore.Util.isEmpty(o);
        });
      } else return null;
    }
    /**
     * Returns an object with all the transformation parameters based on the context and properties of this element
     * and any children.
     * @param extendedProps
     * @returns {object} a hash of transformation and configuration parameters
     * @protected
     */

  }, {
    key: "getTransformation",
    value: function getTransformation(extendedProps) {
      var children = extendedProps.children,
          rest = _objectWithoutProperties(extendedProps, ["children"]);

      var ownTransformation = only(_cloudinaryCore.Util.withCamelCaseKeys(rest), _cloudinaryCore.Transformation.methods) || {};
      var childrenOptions = this.getChildTransformations(children);

      if (!_cloudinaryCore.Util.isEmpty(childrenOptions)) {
        ownTransformation.transformation = childrenOptions;
      }

      return ownTransformation;
    }
    /**
     * Combine properties of all options to create an option Object that can be passed to Cloudinary methods.<br>
     *   `undefined` and `null` values are filtered out.
     * @protected
     * @returns {Object}
     * @param options one or more options objects
     */

  }, {
    key: "getUrl",

    /**
     * Generate a Cloudinary resource URL based on the options provided and child Transformation elements
     * @param extendedProps React props combined with custom Cloudinary configuration options
     * @returns {string} a cloudinary URL
     * @protected
     */
    value: function getUrl(extendedProps) {
      var transformation = this.getTransformation(extendedProps);

      var options = _cloudinaryCore.Util.extractUrlParams(_cloudinaryCore.Util.withSnakeCaseKeys(extendedProps));

      var cl = _cloudinaryCore.Cloudinary["new"](options);

      return cl.url(extendedProps.publicId, transformation);
    }
  }], [{
    key: "normalizeOptions",
    value: function normalizeOptions() {
      for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      return options.reduce(function (left, right) {
        for (var key in right) {
          var value = right[key];

          if (value !== null && value !== undefined) {
            left[key] = value;
          }
        }

        return left;
      }, {});
    }
  }]);

  return CloudinaryComponent;
}(_react.PureComponent);

CloudinaryComponent.contextType = _CloudinaryContextType.CloudinaryContextType;
CloudinaryComponent.propTypes = typesFrom(_cloudinaryCore.Transformation.PARAM_NAMES.map(camelCase));
CloudinaryComponent.propTypes.publicId = _propTypes["default"].string;
CloudinaryComponent.propTypes.responsive = _propTypes["default"].bool;
/**
 * Create a React type definition object. All items are PropTypes.string or [string] or object or [object].
 * @param {Array} configParams a list of parameter names
 * @returns {Object}
 * @private
 */

function typesFrom(configParams) {
  configParams = configParams || [];
  var types = {};

  for (var i = 0; i < configParams.length; i++) {
    var key = configParams[i];
    types[camelCase(key)] = _propTypes["default"].any;
  }

  return types;
}

var _default = CloudinaryComponent;
exports["default"] = _default;