import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FriendsBar from '../component/FriendsBar';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const stubInitialUser = {
    uid:1,
    username: 'test',
    nickname:'test',
}
const mockStore = getMockStore(stubInitialUser,{});
describe('FriendsBar', () => {
    let friendsBar;
    beforeEach(() => {
        friendsBar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <FriendsBar/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(friendsBar);
        expect(component.find('.FriendsBar').length).toBe(1);
    }); 
});