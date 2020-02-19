/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const ChannelItem = ({ name, id, selectCurrentChannel }) => {


  return (
    <Link
      to={`/channel/${id}`}
      onClick={() => selectCurrentChannel(id)}
    >
      {name}
    </Link>
  );
};

export default ChannelItem;
