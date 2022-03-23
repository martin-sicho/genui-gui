import React, { Component, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, Avatar, PageAlert, Page} from '../vibe';
import {RoutedPage} from '../genui/'
// import Logo from '../assets/images/vibe-logo.svg';
// import avatar1 from '../assets/images/avatar1.png';
import defaultRoutes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import LogInManager from '../views/pages/login/LoginManager';
import ProjectManager from '../genui/components/projects/ProjectManager';

const MOBILE_SIZE = 992;

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.apiUrls = this.props.apiUrls;
    this.routes = defaultRoutes;
    this.defaultNav = {
      top: [
        {
          name: 'Projects',
          url: '/projects',
          icon: 'Home',
          key: 'projects'
        },
        {
          divider: true,
        },
      ],
      bottom: [
        // empty
      ],
    };
    this.state = {
      pageTitle : "GenUI",
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: false,
      currentProject: null,
      nav: this.defaultNav,
      headerComponent: null,
      headerTitle: "",
    };
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
      this.toggleSideCollapse();
      this.handleResize();
    }
  }

  componentDidMount() {
    // window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);
  }

  activateProject = (project) => {
    if (!project) {
      this.setState({
        nav: this.defaultNav
      })
      return;
    }

    const url = `/projects/${project.id}/`;
    const nav = JSON.parse(JSON.stringify(this.defaultNav));
    nav.top.push(
      {
        name: "Overview",
        url: url,
        icon: 'Layers',
      }
    );
    nav.top.push(
        {
          divider: true,
        },
    );
    nav.top.push(
      {
        name: "Compounds",
        url: url + "compounds/",
        icon: 'Box',
      }
    );
    nav.top.push(
      {
        name: "QSAR Models",
        url: url + "qsar/",
        icon: 'Activity',
      }
    );
    nav.top.push(
      {
        name: "Generators",
        icon: 'Compass',
        children: [
          {
            name: 'DrugEx',
            url: url + "generators/drugex/",
          }
        ],
      },
    );
    nav.top.push(
      {
        name: "Maps",
        icon: 'Map',
        children: [
          {
            name: 'Creator',
            url: url + "maps/creator/",
          },
          {
            name: 'Explorer',
            url: url + "maps/explorer/",
          }
        ],
      }
    );

    this.setState({
      nav : nav
    })
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  closeChat = () => {
    this.setState({ showChat1: false });
  };

  render() {
    if (!this.props.user) {
      return <Navigate to='/login'/>
    }

    const { sidebarCollapsed } = this.state;
    const {nav} = this.state;
    const routes = this.routes;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
          <PageAlert />
          <div className="app-body">
            <SidebarNav
              nav={nav}
              // logo={Logo}
              logoText="GenUI"
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              {...this.props}
            />
            <Page>
              <Header
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                title={this.state.headerTitle}
                {...this.props}
              >
                <HeaderNav
                    {...this.props}
                    injected={this.injectContentToHeader}
                />
              </Header>
              <PageContent>
                <Routes>
                  {routes.map(page => (
                    <Route
                        path={page.path}
                        key={page.key}
                        element={
                          <ProjectManager
                            projectListURL={this.props.apiUrls.projectList}
                            onProjectOpen={this.activateProject}
                            render={
                              (props) => (
                                <RoutedPage
                                  {...this.props}
                                  {...props}
                                  apiUrls={this.apiUrls}
                                  component={page.component}
                                  title={page.name}
                                  setPageTitle={this.handlePageTitleChange}
                                  setPageHeader={this.handleHeaderChange}
                                  setPageHeaderTitle={this.handleHeaderTitleChange}
                                />
                              )
                            }
                          />
                        }
                    />
                  ))}
                </Routes>
              </PageContent>
            </Page>
          </div>
          <Footer>
            <span>Copyright © 2019 Nice Dash, 2019-{new Date().getFullYear()} Martin Šícho. All rights reserved. Frontend version: <strong>{this.props.packageInfo.version}</strong></span>
            {/*<span>*/}
            {/*  <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>*/}
            {/*</span>*/}
            {/*<span className="ml-auto hidden-xs">*/}
            {/*  Made with{' '}*/}
            {/*  <span role="img" aria-label="taco">*/}
            {/*    🌮*/}
            {/*  </span>*/}
            {/*</span>*/}
          </Footer>
          {/*<Chat.Container>*/}
          {/*  {this.state.showChat1 && (*/}
          {/*    <Chat.ChatBox name="Messages" status="online" image={avatar1} close={this.closeChat} />*/}
          {/*  )}*/}
          {/*</Chat.Container>*/}
        </div>
      </ContextProviders>
    );
  }

    injectContentToHeader = () => {
        return this.state.headerComponent;
    };

    handleHeaderChange = (component) => {
      this.setState({
          headerComponent : component
      });
    };

    handleHeaderTitleChange = (title) => {
      this.setState({
        headerTitle : title
      });
    };

    handlePageTitleChange = (newTitle) => {
      document.title = `GenUI > ${newTitle}`;
      this.setState(() => ({pageTitle : newTitle}));
    }
}

function HeaderNav(props) {
   const Injected = props.injected ? props.injected : React.Fragment;
   const [userMenuOpen, setUserMenuOpen] = useState(false);
   return (
    <React.Fragment>
      {/*<NavItem>*/}
      {/*  <form className="form-inline">*/}
      {/*    <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" />*/}
      {/*    <Button type="submit" className="d-none d-sm-block">*/}
      {/*      <i className="fa fa-search" />*/}
      {/*    </Button>*/}
      {/*  </form>*/}
      {/*</NavItem>*/}
      <Injected/>
      <Dropdown isOpen={userMenuOpen} toggle={() => userMenuOpen ? setUserMenuOpen(false) : setUserMenuOpen(true)}>
        <DropdownToggle nav>
          <Avatar size="small" color="blue" initials={props.user.username[0]} />
        </DropdownToggle>
        <DropdownMenu end>
          {/*<DropdownItem>Settings</DropdownItem>*/}
          {/*<DropdownItem onClick={(e) => {*/}
          {/*  e.preventDefault();*/}
          {/*  props.showProfile()*/}
          {/*}}>Profile</DropdownItem>*/}
          {/*<DropdownItem divider />*/}
          <LogInManager
            accountsRoot={props.apiUrls.accountsRoot}
          >
            {
              (sendLogInRequest, sendLogOutRequest) => (
                <DropdownItem onClick={(e) => {
                  e.preventDefault();
                  sendLogOutRequest(() => props.setUser(null));
                }}>Log Out</DropdownItem>
              )
            }
          </LogInManager>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

const Exported = (props) => (
  <DashboardLayout {...props} location={useLocation()}/>
);
export default Exported;
