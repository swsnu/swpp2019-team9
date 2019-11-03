import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Friends from '../Friends';
import { getMockStore } from '../../test-utils/mocks';
import axios from 'axios';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const stubInitialUser = {
    uid:1,
    username: 'test',
    nickname:'test',
}


const mockStore = getMockStore(stubInitialUser,{});

jest.mock('../component/FriendsBar', () => {
    return jest.fn(() => {
      return (
        <div className="spyFriendsBar"/>
        );
    });
});

jest.mock('../component/PopupFilled', () => {
    return jest.fn(props => {
      return (
        <div className="spyAddGroupPopup">
            <button id="spyConfirm" onClick={props.clickConfirm}/>
            <button id="spyClose" onClick={props.clickClose}/>
            <input id='spyContent' onChange={props.changeContent}/>
        </div>
        );
    });
});

jest.mock('../component/PopupMessage', () => {
    return jest.fn((props) => {
      return (
        <div className="spyFriendPopupMessage">
            <button id="spyExit" onClick={props.clickClose}/>
        </div>
        );
    });
});

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
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: [{'id': 1, 'firstword' : 'a', 'groupname': 'ab', 'num':1, 'TopFever': 'a'}]
                };
                resolve(result);
            })
        });
    })
    it('should render', () => {
        const component = mount(friends);
        expect(component.find('.Friends').length).toBe(1);
    });

    it('should add group',()=>{
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 201,
                };
                resolve(result);
            })
        });
        const groupname='test'
        const component = mount(friends)
        const button = component.find("#add-group-button")
        button.simulate('click')
        const wrapper = component.find("#spyContent")
        wrapper.simulate('change', {target:{value:groupname}});
        const FriendsInstance = component.find(Friends).instance();
        expect(FriendsInstance.state.groupName).toEqual('test')
        const wrapper1 = component.find("#spyConfirm")
        wrapper1.simulate('click')
        expect(axios.post).toHaveBeenCalledTimes(1);
    })
    /*
    it('should redirect to group',()=>{
        history.push = jest.fn(()=>{})
        const component = mount(friends)
        const FriendsInstance = component.find(Friends).instance();
        FriendsInstance.setState({groupList: [{'id': 1, 'firstword' : 'a', 'name': 'ab', 'num':1, 'TopFever': 'a'}]})
        expect(component.find('#group-name').length).toBe(1);
    })
    */
    it('should not add group',()=>{
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 201,
                };
                resolve(result);
            })
        });
        const groupname='aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        const component = mount(friends)
        const button = component.find("#add-group-button")
        button.simulate('click')
        const wrapper = component.find("#spyContent")
        wrapper.simulate('change', {target:{value:groupname}});
        const FriendsInstance = component.find(Friends).instance();
        expect(FriendsInstance.state.groupName).toEqual(groupname)
        const wrapper1 = component.find("#spyConfirm")
        wrapper1.simulate('click')
        expect(axios.post).toHaveBeenCalledTimes(0);
    })

    it('should not add group2',()=>{
        axios.post = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    response: {status:403},
                    data: null
                };
                reject(result)
                resolve()
            })
        });
        const groupname='test'
        const component = mount(friends)
        const button = component.find("#add-group-button")
        button.simulate('click')
        const wrapper = component.find("#spyContent")
        wrapper.simulate('change', {target:{value:groupname}});
        const FriendsInstance = component.find(Friends).instance();
        expect(FriendsInstance.state.groupName).toEqual(groupname)
        const wrapper1 = component.find("#spyConfirm")
        wrapper1.simulate('click')
        expect(axios.post).toHaveBeenCalledTimes(1);
        const wrapper2 = component.find("#spyExit")
        wrapper2.simulate('click')
        expect(component.find('.Friends').length).toBe(1);
    })

    it('should close popup',()=>{
        const component = mount(friends)
        const button = component.find("#add-group-button")
        button.simulate('click')
        const wrapper1 = component.find("#spyClose")
        wrapper1.simulate('click')
        expect(component.find('.Friends').length).toBe(1);
    })
});