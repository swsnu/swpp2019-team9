import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Friends from '../Friends';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({login : false});

describe('Friends', () => {
    let friends;
    beforeEach(() => {
        friends = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Friends/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(friends);
        expect(component.find('.Friends').length).toBe(1);
    });
});