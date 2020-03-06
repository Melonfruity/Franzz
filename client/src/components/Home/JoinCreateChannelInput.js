import React from 'react';
import TextField from '@material-ui/core/TextField';

// IT DETECTS EVENT, I MIGHT HAVE TO PASS THE ENTIRE HANDLE LOGIN FUCNITON INTO HERE THOUGH

const JoinCreateChannelInput = ({ name, createChannel }) => (
  <TextField
    className="JoinCreateInput"
    id="outlined-basic"
    label={name}
    placeholder={name}
    onKeyPress={(e) => (e.key === 'Enter' ? createChannel(e) : null)}
    variant="outlined"
  />
);

export default JoinCreateChannelInput;
