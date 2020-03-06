"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSyncState;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UNINTIALIZED_STATE = {};

function useSyncState(initialState) {
  const stateRef = React.useRef(UNINTIALIZED_STATE);

  if (stateRef.current === UNINTIALIZED_STATE) {
    stateRef.current = // @ts-ignore
    typeof initialState === 'function' ? initialState() : initialState;
  }

  const [state, setTrackingState] = React.useState(stateRef.current);
  const getState = React.useCallback(() => stateRef.current, []);
  const setState = React.useCallback(state => {
    if (state === stateRef.current) {
      return;
    }

    stateRef.current = state;
    setTrackingState(state);
  }, []);
  return [state, getState, setState];
}
//# sourceMappingURL=useSyncState.js.map