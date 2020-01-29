/* eslint-disable react/prop-types */
import React from 'react';

import Message from './Message';

const TextContainer = ({ messages }) => {
  const formattedMessages = messages.map((msg) => (
    <article
      key={msg.id}
    >
      <Message
        message={msg.text}
      />
    </article>
  ));

  return (
    <div>
      {formattedMessages}
    </div>
  );
};

export default TextContainer;
