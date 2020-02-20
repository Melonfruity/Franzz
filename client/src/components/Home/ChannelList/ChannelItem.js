/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const ChannelItem = ({ name, id, selectCurrentChannel }) => {


  return (
    <Link
      to={`/channel/${id}`}
      onClick={() => selectCurrentChannel(id)}
    >
      <ListItem button onClick={() => selectCurrentChannel(id)}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        {name}
      </ListItem>
    </Link>
  );
};

export default ChannelItem;
