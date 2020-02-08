/* eslint-disable react/prop-types */
import React from 'react';

const Message = ({ id, username, message, created }) => (
  <article>
    {id}
    {' '}
    {username}
    {':<'}
    {message}
    {'>created at '}
    {created}
  </article>
);

export default Message;
