import React from 'react';
import { mount } from 'enzyme';
import Group from '../Group';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';
import axios from 'axios';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

jest.mock('../component/FriendsBar', () => {
    return jest.fn(() => {
      return (
        <div className="spyFriendsBar">
        </div>
        );
    });
});

jest.mock('../component/CommentSection', () => {
    return jest.fn(() => {
      return (
        <div className="spyFriendsBar">
        </div>
        );
    });
});

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

jest.mock('../component/PopUpModal', () => {
    return jest.fn((props) => {
      return (
        <div className="spyExitPopup">
            <button id="spyExit" onClick={props.clickClose}/>
            <button id="spyOK" onClick={props.clickConfirm}/>
        </div>
        );
    });
});

const stubInitialUser = {
    uid:1,
    username: 'Youngjae',
    nickname:'Youngjae',
}
const mockStore = getMockStore(stubInitialUser,{});

describe("Group",()=>{
    let group;
    let spyhistoryPush;
    beforeEach(() => {
        group = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Group/>
                </ConnectedRouter>
            </Provider>
        );
        
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: [
                        
                    ]
                };
                resolve(result);
            })
        })
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 201,
                };
                resolve(result);
            })
        })
        axios.delete = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                };
                resolve(result);
            })
        })
        spyhistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(() => { return {}; });
    });

    afterEach(() => { jest.clearAllMocks() });

    it("should render", ()=>{
        const component = mount(group);
        expect(component.find('#group_body').length).toBe(1);
    })

    it("should exit group", ()=>{
        const component = mount(group);
        const exit_button = component.find("#ExitGroupButton")
        exit_button.simulate("click")

        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        expect(newGroupInstance.state.showExitPopup).toBe(true);
        
        const cancel_button = component.find("#spyExit")
        cancel_button.simulate("click")
        expect(newGroupInstance.state.showExitPopup).toBe(false);
        
        exit_button.simulate("click")
        const confirm_button = component.find("#spyOK")
        confirm_button.simulate("click")
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(spyhistoryPush).toHaveBeenCalledTimes(1);
    })

    it("should click friends and close", ()=>{
        const component = mount(group);
        const add_button = component.find("#AddMemberButton")
        add_button.simulate("click")

        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        expect(newGroupInstance.state.showMemberPopup).toBe(true);
        
        const cancel_button = component.find("#closeAddMember")
        cancel_button.at(0).simulate("click")
        expect(newGroupInstance.state.showMemberPopup).toBe(false);
        expect(newGroupInstance.state.FriendNames).toStrictEqual([]);
    })

    it("should click friends and confirm", ()=>{
        const component = mount(group);
        const add_button = component.find("#AddMemberButton")
        
        add_button.simulate("click")
        const confirm_button = component.find("#confirmAddMember")
        confirm_button.at(0).simulate("click")
        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        expect(newGroupInstance.state.FriendNames).toStrictEqual([]);

        expect(newGroupInstance.state.AddFriendMessageTitle).toBe("No Friend Selected");
        expect(newGroupInstance.state.AddFriendMessageContent).toBe("Select Friend");
        component.find("#spyConfirm").simulate("click")

        expect(newGroupInstance.state.showInviteMessagePopup).toBe(false);
    })

    it("should click friends check and confirm", ()=>{
        const component = mount(group);
        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        
        const add_button = component.find("#AddMemberButton")
        add_button.simulate("click")

        newGroupInstance.setState({FriendNames : [
            {"nickname":["GG"]},
        ]})
        const confirm_button = component.find("#confirmAddMember")
        confirm_button.at(0).simulate("click")

        //expect(newGroupInstance.state.showMemberPopup).toBe(false);
        //expect(newGroupInstance.state.showInviteMessagePopup).toBe(true);
        expect(axios.post).toHaveBeenCalledTimes(1);
        //expect(newGroupInstance.state.AddFriendMessageTitle).toBe("Friend request sended");
        //expect(newGroupInstance.state.AddFriendMessageContent).toBe("Successfully Invited");
        //component.find("#spyConfirm").simulate("click")
        //expect(newGroupInstance.state.showInviteMessagePopup).toBe(false);
    })
})

