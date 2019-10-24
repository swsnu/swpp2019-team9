import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Signup from '../Signup';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({login : false});

describe('Signup', () => {
    let signup;
    beforeEach(() => {
        signup = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Signup/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(signup);
        expect(component.find('.Signup').length).toBe(1);
    });


});