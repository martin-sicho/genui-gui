import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import LoginPage from './views/pages/login/LoginPage';

const PUBLIC_URL = process.env.PUBLIC_URL;
let BACKEND_URL = new URL('http://localhost:8000');
let GENUI_DEPLOY_VERSION = 'dev';
if (process.env.REACT_APP_GENUI_BACKEND_ROOT_URL) {
  BACKEND_URL = (process.env.REACT_APP_GENUI_BACKEND_ROOT_URL);
}
if (process.env.GENUI_DEPLOY_VERSION) {
  GENUI_DEPLOY_VERSION = (process.env.GENUI_DEPLOY_VERSION);
}
const REMOTE_API_ROOT = new URL('api/', BACKEND_URL);
console.log(`API root: ${REMOTE_API_ROOT}`);

const generatorsURL = new URL('generators/', REMOTE_API_ROOT);
const URL_ROOTS = {
  root: REMOTE_API_ROOT,
  accountsRoot: new URL('accounts/', REMOTE_API_ROOT),
  projectList : new URL('projects/', REMOTE_API_ROOT),
  compoundsRoot: new URL('compounds/', REMOTE_API_ROOT),
  compoundSetsRoot : new URL('compounds/sets/', REMOTE_API_ROOT),
  activitySetsRoot : new URL('compounds/activity/sets/', REMOTE_API_ROOT),
  qsarRoot : new URL('qsar/', REMOTE_API_ROOT),
  generatorsRoot : generatorsURL,
  drugexRoot : new URL('drugex/', generatorsURL),
  mapsRoot: new URL('maps/', REMOTE_API_ROOT),
  celeryProgress : new URL('tasks/progress/', REMOTE_API_ROOT),
};

const fetchUserInfo = (callback) => {
  fetch(new URL('user/', URL_ROOTS.accountsRoot), {
    credentials: "include",
    "headers": {
      "Accept": "application/json",
    },
    "method": "GET"
  }).then(response => response.json())
    .then(data => {
      if (data.username) {
        callback(data);
      } else {
        callback(null)
      }
    })
    .catch(e => console.log(e))
};

export default function App() {
  const [user, setUser] = React.useState(null);
  const appPath = PUBLIC_URL ? PUBLIC_URL : '';
  const devMode = GENUI_DEPLOY_VERSION === 'dev';
  const loginPath = '/login/';

  return (
    <BrowserRouter basename={appPath}>
      <Switch>
        <Route
          exact
          path={loginPath}
          render={
            (props) => (
              <LoginPage
                {...props}
                devMode={devMode}
                apiUrls={URL_ROOTS}
                fetchUserInfo={fetchUserInfo}
                setUser={setUser}
                user={user}
                loginPagePath={loginPath}
                appPath={appPath}
              />
            )
          }/>
        <Route path='/projects/' render={
          (props) => (
            <DashboardLayout
              {...props}
              devMode={devMode}
              apiUrls={URL_ROOTS}
              user={user}
              setUser={setUser}
              fetchUserInfo={fetchUserInfo}
              loginPagePath={loginPath}
              appPath={appPath}
            />
          )
        } />
        <Route path="/">
          <Redirect to='/projects/'/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
