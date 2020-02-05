import React from "react";

export default function PopUpButton({ toggleButton }) {
  return (
    <button onClick={ toggleButton }>
      Click me for toggling window
    </button>
  )
}