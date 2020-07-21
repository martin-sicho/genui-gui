import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import { TabWidget } from '../../../genui';
import React from 'react';
import RegisterTab from './RegisterTab';
import LoginTab from './LoginTab';

const Announcement = (props) => {
    const [modal, setModal] = React.useState(true);

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

export default function LoginPage(props) {

  const tabs = [
    {
      title: "Login",
      renderedComponent: LoginTab
    },
    {
      title: "Register",
      renderedComponent: RegisterTab
    }
  ];

  return (
    <Container className="p-l-lg p-r-lg">
        {
            props.devMode ? <Announcement/> : null
        }

      <h1>Sign In</h1>

      <hr/>

      <Row>
        <Col sm={12}>
          <TabWidget {...props} tabs={tabs}/>
        </Col>
      </Row>
    </Container>
  )
}