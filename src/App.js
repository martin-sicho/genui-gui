import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import './vibe/scss/styles.scss';
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import packageInfo from './package.json';
import LoginLayout from './layouts/LoginLayout';
import { fetchUserInfo } from './views/pages/login/LoginManager';

const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';
let GENUI_DEPLOY_VERSION = 'dev';
if (process.env.GENUI_DEPLOY_VERSION) {
  GENUI_DEPLOY_VERSION = (process.env.GENUI_DEPLOY_VERSION);
}

const fetchBackendRoots = (callback) => {
    fetch(`${PUBLIC_URL}/info/backend/host.json`, {
        "headers": {
            "Accept": "application/json",
        },
        "method": "GET"
    }).then(response => response.json())
        .then(data => {
            let BACKEND_URL = data.url;
            const REMOTE_API_ROOT = new URL('api/', BACKEND_URL);
            console.log(`Found GenUI backend API: ${REMOTE_API_ROOT}`);

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
  const [userChecked, setUserChecked] = React.useState(false);
  const [nextPage, setNextPage] = React.useState('projects');
  let appPath = PUBLIC_URL ? PUBLIC_URL : '';
  const devMode = GENUI_DEPLOY_VERSION !== 'prod' || GENUI_DEPLOY_VERSION !== 'latest';

  useEffect( () => {
    const next = window.location.pathname.replaceAll(appPath, "");
    if (next === '/' || next === '') {
      setNextPage('projects');
    } else {
      setNextPage(next.replace(/\/?$/, '/'));
    }
    fetchBackendRoots(roots => {
      setApiRoots(roots);
      fetchUserInfo(roots.accountsRoot, userData => {
        setUserChecked(true);
        if (userData && userData.pk) {
          setUser(userData);
        }
      });
    });
  }, [appPath]);

  if (!user && !userChecked) {
    return "Preparing..."; // TODO: show some loading info
  }
  return (
    <BrowserRouter basename={appPath}>
      <Routes>
        <Route
          path='login'
          element={
            <LoginLayout
                  devMode={devMode}
                  accountsRoot={apiRoots.accountsRoot}
                  setUser={setUser}
                  user={user}
                  appRoot={appPath}
            />}
        />
        <Route path='/*' element={
            <DashboardLayout
              devMode={devMode}
              apiUrls={apiRoots}
              user={user}
              setUser={setUser}
              appRoot={appPath}
              packageInfo={packageInfo}
            />
        } />
        <Route path='' element={!user && userChecked ? <Navigate to="login"/> : <Navigate to={nextPage}/>} />
      </Routes>
    </BrowserRouter>
  );
}
