import React, { useState } from 'react';
import LoginPage from '../views/pages/login/LoginPage';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const Announcement = (props) => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <Modal isOpen={modal} toggle={toggle} className="announce-modal">
      <ModalHeader toggle={toggle}>Announcement</ModalHeader>
      <ModalBody>
        This is a development preview of the GenUI app.
        Therefore, it can still contain bugs and some
        features might not work correctly. On this server, e-mail verification is
        turned off for user registration and user data is not backed up.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>OK</Button>{' '}
        {/*<Button color="secondary" onClick={toggle}>Cancel</Button>*/}
      </ModalFooter>
    </Modal>
  );
};

export default function LoginLayout (props) {
  return (
    <React.Fragment>
      {
        props.devMode ? <Announcement/> : null
      }
      <LoginPage
        {...props}
      />
    </React.Fragment>
  )
}