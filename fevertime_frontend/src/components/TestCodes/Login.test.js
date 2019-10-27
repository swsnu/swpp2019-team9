import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Login from '../Login';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import {Switch,Route} from "react-router-dom"
import * as loginAction from '../../store/actions/login';

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
                    <Switch>
                    <Route path='/' exact component={Login} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        loginAction.loginUser =jest.fn(()=>{return dispatch=>{}});
    })
    it('should render', () => {
        const component = mount(login);
        expect(component.find('.Login').length).toBe(1);
    });
    it('should click login',()=>{
        const id = 'testid'
        const password='testpw';
        const component = mount(login)
        const wrapper = component.find("#id-input")
        wrapper.simulate('change', {target:{value:id}});
        const wrapper2 = component.find("#pw-input")
        wrapper2.simulate('change', {target:{value:password}});
        const wrapper3 = component.find("#login-button").at(0);
        const newLoginInstance = component.find(Login.WrappedComponent).instance();
        expect(newLoginInstance.state.username).toEqual(id)
        expect(newLoginInstance.state.password).toEqual(password)
        wrapper3.simulate('click');
        expect(loginAction.loginUser).toHaveBeenCalledTimes(1);
    })
    


});