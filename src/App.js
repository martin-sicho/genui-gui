import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import LoginPage from './views/pages/login/LoginPage';
import packageInfo from './package.json';

const PUBLIC_URL = process.env.PUBLIC_URL;
let GENUI_DEPLOY_VERSION = 'dev';
if (process.env.GENUI_DEPLOY_VERSION) {
  GENUI_DEPLOY_VERSION = (process.env.GENUI_DEPLOY_VERSION);
}

const fetchUserInfo = (accountsRoot, callback) => {
  fetch(new URL('user/', accountsRoot), {
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

const fetchBackendUrl = (callback) => {
    fetch('info/backend/host.json', {
        "headers": {
            "Accept": "application/json",
        },
        "method": "GET"
    }).then(response => response.json())
        .then(data => {
            let BACKEND_URL = data.url;
            const REMOTE_API_ROOT = new URL('api/', BACKEND_URL);
            console.log(`Found API root: ${REMOTE_API_ROOT}`);

            const generatorsURL = new URL('generators/', REMOTE_API_ROOT);
            callback({
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
            });
        })
        .catch(e => console.log(e))

    return null
}

export default function App() {
  const [apiRoots, setApiRoots] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const appPath = PUBLIC_URL ? PUBLIC_URL : '';
  const devMode = GENUI_DEPLOY_VERSION !== 'prod' || GENUI_DEPLOY_VERSION !== 'latest';
  const loginPath = '/login/';

  if (!apiRoots) {
      if (devMode) {
          console.error("Running in development mode!");
      }
      fetchBackendUrl(setApiRoots);
      return <div>Loading...</div>;
  }

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
                apiUrls={apiRoots}
                fetchUserInfo={callback => fetchUserInfo(apiRoots.accountsRoot, callback)}
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
              apiUrls={apiRoots}
              user={user}
              setUser={setUser}
              fetchUserInfo={callback => fetchUserInfo(apiRoots.accountsRoot, callback)}
              loginPagePath={loginPath}
              appPath={appPath}
              packageInfo={packageInfo}
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
