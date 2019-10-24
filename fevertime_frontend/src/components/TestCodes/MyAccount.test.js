import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import MyAccount from '../MyAccount';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({login : false});

describe('MyAccount', () => {
    let myaccount;
    beforeEach(() => {
        myaccount = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <MyAccount/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(myaccount);
        expect(component.find('.MyAccount').length).toBe(1);
    });


});