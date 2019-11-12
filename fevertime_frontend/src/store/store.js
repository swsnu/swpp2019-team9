import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import login from './reducers/login'
import feverStart from './reducers/feverStart'

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    login: login,
    feverStart: feverStart,
    router: connectRouter(history),
});

const logger = store => {
    return next => {
    return action => {
    console.log('[Middleware] Dispatching', action);
    const result = next(action);
    console.log('[Middleware] Next State', store.getState());
    return result;
    }
}};//for debugging...


export const middlewares = [thunk,logger, routerMiddleware(history)]
//export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(...middlewares)));

export default store;
