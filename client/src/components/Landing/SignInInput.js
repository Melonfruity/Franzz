import React from 'react';
import TextField from '@material-ui/core/TextField';

// IT DETECTS EVENT, I MIGHT HAVE TO PASS THE ENTIRE HANDLE LOGIN FUCNITON INTO HERE THOUGH


const SignInInput = (props) => (
  <form noValidate autoComplete="off">
    <TextField
      className="signInInput"
      id="outlined-basic"
      label={props.name}
      onKeyPress={(e) => (e.key === 'Enter' ? props.handleLogin(e) : null)}
      variant="outlined"
    />
  </form>
);

export default SignInInput;
