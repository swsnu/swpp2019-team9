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
jest.mock('../component/PopupMessage', () => {
    return jest.fn(props => {
      return (
        <div className="spyAddMessage">
            <button id="spyConfirm" onClick={props.clickConfirm}/>
            <button id="spyClose" onClick={props.clickClose}/>
            <input id='spyContent' onChange={props.changeContent}/>
        </div>
        );
    });
});
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

    it('should not click', () => {
        const component = mount(header);
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                pathname: '/fevermode'
            }
        });
        component.find("#logout-button").simulate('click')
        /*
        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        expect(newGroupInstance.state.FriendNames).toStrictEqual([]);

        expect(newGroupInstance.state.AddFriendMessageTitle).toBe("No Friend Selected");
        expect(newGroupInstance.state.AddFriendMessageContent).toBe("Select Friend");
        component.find("#spyConfirm").simulate("click")

        expect(newGroupInstance.state.showInviteMessagePopup).toBe(false);
        */
        expect(loginAction.logoutUser).toHaveBeenCalledTimes(0);
    });
    it('should not click', () => {
        const component = mount(header);
        global.window = Object.create(window);
        const newHeaderInstance = component.find(Header.WrappedComponent).instance();
        Object.defineProperty(window, 'location', {
            value: {
                pathname: '/fevermode'
            }
        });
        component.find("#link").at(0).simulate('click')
        component.find("#spyConfirm").simulate("click")
        expect(newHeaderInstance.state.fevermode).toEqual(false)
    });
});