import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

export default function SimpleChooser(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Container fluid>
      <Row>
        <Col xs="3" md="1">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret size="lg" color="primary">Add</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{props.title}</DropdownItem>
              {
                props.options.map(item => <DropdownItem onClick={() => props.onAdd(props.title, props.objectFromOption(item))} key={item.value}>{item.value}</DropdownItem>)
              }
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs="5" md="9">
          <ListGroup numbered>
            {
              props.existing.map(item => <ListGroupItem key={item.id}>{props.objectToName(item)}</ListGroupItem>)
            }
          </ListGroup>
        </Col>
        <Col xs="2" md="2">
          <ListGroup>
            {
              props.existing.map(item => <Button style={{marginTop: "3px"}} key={item.id} color="danger" onClick={() => props.onDelete(props.title, item) }>Remove</Button>)
            }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}