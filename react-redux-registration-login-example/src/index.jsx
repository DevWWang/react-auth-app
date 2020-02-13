import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';

import * as serviceWorker from './service-worker';
import { subscribeUser } from './subscription';

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

serviceWorker.register();
// subscribeUser();