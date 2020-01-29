/* eslint-disable react/prop-types */
import React from 'react';

const Input = ({ message, sendMessage }) => (
  <form>
    Input
    <input
      {...message}
      reset={undefined}
      onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
    />
    <button
      type="submit"
      onClick={(e) => sendMessage(e)}
    >
      submit
    </button>
  </form>
);

export default Input;
