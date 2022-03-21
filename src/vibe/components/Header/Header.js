import React, { Component } from 'react';
import ToggleSidebarButton from './components/ToggleSidebarButton';
import PageLoader from '../PageLoader/PageLoader';

import { Navbar, NavbarToggler, Collapse, Nav } from 'reactstrap';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <header className="app-header">
        <SkipToContentLink focusId="primary-content" />
        <div className="top-nav">
          <Navbar color="faded" light expand="md">
            <ToggleSidebarButton
              toggleSidebar={this.props.toggleSidebar}
              isSidebarCollapsed={this.props.isSidebarCollapsed}
            />
            <div className="page-heading">{this.props.title}</div>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ms-auto" navbar>
                {this.props.children}
              </Nav>
            </Collapse>
            <PageLoader />
          </Navbar>
        </div>
      </header>
    );
  }
}

const SkipToContentLink = ({ focusId }) => {
  return (
    <a href={`#${focusId}`} tabIndex="1" className="skip-to-content">
      Skip to Content
    </a>
  );
};
