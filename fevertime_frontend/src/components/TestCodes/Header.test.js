import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Header from '../Header';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import * as loginAction from '../../store/actions/login';

const stubInitialUser = {
    uid:1,
    username: 'test',
    nickname:'test',
}
const stubInitialUser2 = {
    uid:null,
    username: null,
    nickname:null,
}
const mockStore = getMockStore(stubInitialUser,{});
const mockStore2 = getMockStore(stubInitialUser2,{});
describe('Header', () => {
    let header;
    beforeEach(() => {
        header = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Header/>
                </ConnectedRouter>
            </Provider>
        );
        loginAction.logoutUser =jest.fn(()=>{return ()=>{}});
    })
    it('should render', () => {
        const component = mount(header);
        expect(component.find('.Header').length).toBe(1);
    });
    it('should render2', () => {
        header = (
            <Provider store={mockStore2}>
                <ConnectedRouter history={history}>
                    <Header/>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(header);
        expect(component.find('.Header').length).toBe(1);
    });
    it('should click logout', () => {
        const component = mount(header);
        component.find("#logout-button").simulate('click')
        expect(loginAction.logoutUser).toHaveBeenCalledTimes(1);
    });
});