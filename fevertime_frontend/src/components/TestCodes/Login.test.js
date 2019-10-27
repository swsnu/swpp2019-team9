import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Login from '../Login';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({login : false});

jest.mock('react-router-dom', () => {
    const original = jest.requireActual("react-router-dom")
    return {
        ...original,
        Link: jest.fn(()=>{
            return(<div id="spyLink"/>)})
        }
});

describe('Login', () => {
    let login;
    beforeEach(() => {
        login = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Login/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(login);
        expect(component.find('.Login').length).toBe(1);
    });


});