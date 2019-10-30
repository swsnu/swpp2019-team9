import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter } from 'connected-react-router';

import { history, middlewares } from '../store/store';

const getMockReducer = jest.fn(
    initialState => (state = initialState, action) => {
        switch (action.type) {
            default:
                break;
        }
        return state;
    }
);

export const getMockStore = (loginState,feverState) => {
    const loginReducer = getMockReducer(loginState);
    const feverReducer = getMockReducer(feverState);
    const rootReducer = combineReducers({
        login: loginReducer,
        feverStart: feverReducer,
        router: connectRouter(history),
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const mockStore = createStore(rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)));
    return mockStore;
}


