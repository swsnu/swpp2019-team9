import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FriendsBar from '../component/FriendsBar';
import { getMockStore } from '../../test-utils/mocks';
import axios from 'axios';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";


jest.mock('../component/PopupFilled', () => {
    return jest.fn(props => {
      return (
        <div className="spyAddFriendPopup">
            <button id="spyConfirm" onClick={props.clickConfirm}/>
            <button id="spyClose" onClick={props.clickClose}/>
            <input id='spyContent' onChange={props.changeContent}/>
        </div>
        );
    });
});
const stubInitialUser = {
    uid:1,
    username: 'test',
    nickname:'test',
}

axios.get = jest.fn(() => {
    return new Promise((resolve) => {
        const result = {
            status: 200,
            data: [{'nickname': 'test'}]
        };
        resolve(result);
    })
});

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
    it('should accept request',()=>{
        axios.post = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    status: 201,
                    data: {'nickname': 'test'}
                };
                resolve(result);
                reject({status:404})
            })
        });
        const component = mount(friendsBar)
        const button = component.find("#request-tab")
        const FriendsBarInstance = component.find(FriendsBar).instance();
        FriendsBarInstance.setState({friendlist: [{'firstword' : 'r', 'name': 'real'}],
                                    friendinglist: [{'firstword' : 'r', 'name': 'request'}]})
        button.simulate('click')
        const wrapper1 = component.find("#accept-button")
        wrapper1.simulate('click')
        expect(axios.post).toHaveBeenCalledTimes(1);
    })
    it('should delete friend',()=>{
        axios.delete = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200
                };
                resolve(result);
            })
        });
        const component = mount(friendsBar)
        const button = component.find("#real-tab")
        const FriendsBarInstance = component.find(FriendsBar).instance();
        FriendsBarInstance.setState({friendlist: [{'firstword' : 'r', 'name': 'real'}],
                                    friendinglist: [{'firstword' : 'r', 'name': 'request'}]})
        button.simulate('click')
        const wrapper2 = component.find("#delete-button")
        wrapper2.simulate('click')
        expect(axios.delete).toHaveBeenCalledTimes(1);
    })
    it('should decline request',()=>{
        axios.delete = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200
                };
                resolve(result);
            })
        });
        const component = mount(friendsBar)
        const button = component.find("#request-tab")
        const FriendsBarInstance = component.find(FriendsBar).instance();
        FriendsBarInstance.setState({friendlist: [{'firstword' : 'r', 'name': 'real'}],
                                    friendinglist: [{'firstword' : 'r', 'name': 'request'}]})
        button.simulate('click')
        const wrapper2 = component.find("#decline-button")
        wrapper2.simulate('click')
        expect(axios.delete).toHaveBeenCalledTimes(1);
    })
    it('should close send',()=>{
        axios.post = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    status: 201,
                    data: {'nickname': 'test'}
                };
                resolve(result);
                reject({status:404})
            })
        });
        const component = mount(friendsBar)
        const button = component.find("#add-friend-button")
        button.simulate('click')
        const wrapper1 = component.find("#spyClose")
        wrapper1.simulate('click')
        expect(axios.post).toHaveBeenCalledTimes(0);
    })
    it('should send request',()=>{
        global.alert=jest.fn();
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 201,
                    data: {'nickname': 'test'}
                };
                resolve(result);
            })
        });
        const nickname='test'
        const component = mount(friendsBar)
        const button = component.find("#add-friend-button")
        button.simulate('click')
        const wrapper = component.find("#spyContent")
        wrapper.simulate('change', {target:{value:nickname}});
        const FriendsBarInstance = component.find(FriendsBar).instance();
        expect(FriendsBarInstance.state.friendname).toEqual('test')
        const wrapper1 = component.find("#spyConfirm")
        wrapper1.simulate('click')
        expect(axios.post).toHaveBeenCalledTimes(1);
    })
    it('should give alert1',()=>{
        global.alert=jest.fn();
        const component = mount(friendsBar)
        const button = component.find("#add-friend-button")
        button.simulate('click')
        const wrapper1 = component.find("#spyConfirm")
        wrapper1.simulate('click')
        expect(global.alert).toHaveBeenCalledTimes(1);
    })
    /*
    it('should give reject',()=>{
        global.alert=jest.fn();
        axios.post = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    status: 404,
                    data: null
                };
                resolve()
                reject(new Error(result))
            })
        });
        const nickname='test'
        const component = mount(friendsBar)
        const button = component.find("#add-friend-button")
        button.simulate('click')
        const wrapper = component.find("#spyContent")
        wrapper.simulate('change', {target:{value:nickname}});
        const FriendsBarInstance = component.find(FriendsBar).instance();
        expect(FriendsBarInstance.state.friendname).toEqual('test')
        const wrapper1 = component.find("#spyConfirm")
        wrapper1.simulate('click')
        expect(global.alert).toHaveBeenCalledTimes(1);
    })
    */
   
});