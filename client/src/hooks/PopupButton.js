import { useState } from "react";

export default function PopupButtonDisplay(initialMode) {
  let [ boxDisplay, changeDisplay ] = useState(initialMode);

  const clickedButton = function() {
    if (boxDisplay === 'off') {
      changeDisplay('on')
    } else{
      changeDisplay('off')
    }
  }

  return { 
    boxDisplay,
    clickedButton
  }
}