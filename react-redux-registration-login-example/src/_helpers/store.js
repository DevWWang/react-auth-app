import 'regenerator-runtime/runtime'
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { handleNewMessage } from './saga';
import { setupSocket } from './socket';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        sagaMiddleware
    )
);

const socket = setupSocket(store.dispatch);
sagaMiddleware.run(handleNewMessage, { socket });