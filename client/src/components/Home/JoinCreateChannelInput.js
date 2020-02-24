import React from 'react';
import TextField from '@material-ui/core/TextField';

// IT DETECTS EVENT, I MIGHT HAVE TO PASS THE ENTIRE HANDLE LOGIN FUCNITON INTO HERE THOUGH

const JoinCreateChannelInput = (props) => (
  <TextField
    className="JoinCreateInput"
    id="outlined-basic"
    label={props.name}
    placeholder={props.name}
    onKeyPress={(e) => (e.key === 'Enter' ? props.createChannel(e) : null)}
    variant="outlined"
  />
);

export default JoinCreateChannelInput;
