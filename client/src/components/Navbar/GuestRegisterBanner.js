import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useField } from '../../hooks/useField';
import auth from '../../service/authService';
import GoogleLogin from '../Landing/Login/GoogleLogin';

const GuestRegisterBanner = ({ setState }) => {
  const [show, setShow] = useState(false);

  const email = useField('text');
  const password = useField('password');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegister = (e) => {
    e.preventDefault();
    const registerObj = {
      email: email.value,
      password: password.value,
    };
    auth
      .register(registerObj)
      .then((registered) => {
        if (registered) {
          setState((prev) => ({
            ...prev,
            authorization: window.localStorage.getItem('authorization'),
            username: window.localStorage.getItem('username'),
            currentUser: window.localStorage.getItem('userID'),
            guest: localStorage.getItem('guest'),
          }));
        }
      });
  };

  return (
    <div>
      <div
        className="guestRegisterBanner"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.preventDefault()}
        onClick={(e) => handleShow(e)}
      >
        <p className="bannerMessage">If you wish to save your username and chats the next time you visit, click here to create an account!</p>
      </div>

      <Modal show={show} onHide={handleClose} className="NewAccountModal">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="NewAccountModalBody">
          <form className="NewAccountRegistrationModalForm">
            <p>
              Welcome! Claim your account to keep all your servers and chats even after you close the browser.
            </p>
            <div className="email">
              <TextField
                name="email"
                id="outlined-basic"
                label="email"
                placeholder="email"
                {...email}
                reset={undefined}
                onKeyPress={(e) => (e.key === 'Enter' ? handleRegister(e) : null)}
                variant="outlined"
                className="NewAccountModalInput"
              />
            </div>
            <div className="password">
              <TextField
                name="password"
                id="outlined-basic"
                label="password"
                placeholder="password"
                {...password}
                reset={undefined}
                onKeyPress={(e) => (e.key === 'Enter' ? handleRegister(e) : null)}
                variant="outlined"
                className="NewAccountModalInput"
              />
            </div>
          </form>
          <div className="guestRegisterModalButtons">
            <Button className="guestRegisterModalCloseButton" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          {/* <div className="modalFooter"> */}
          <div className="modalDivider">
            <p> ------------- Login With Google ------------- </p>
          </div>
          <div className="guestModalGoogleLoginButton">
            <GoogleLogin className="googleLogin" setState={setState} />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GuestRegisterBanner;
