import { useState } from 'react';

// Hook used to change of class state,
// of the drag and box box for photos
// This determines if it should be highlighted or not
export default function useChangeHighlightClass(initialMode) {
  const [highlightClass, change] = useState(initialMode);

  const changeHighlightClass = function (eventName) {
    if (eventName === 'dragenter'
        || eventName === 'dragover') {
      change('highlight');
    } else {
      change('');
    }
  };

  return {
    highlightClass,
    changeHighlightClass,
  };
}
