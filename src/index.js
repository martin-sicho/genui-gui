import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './registerServiceWorker';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
