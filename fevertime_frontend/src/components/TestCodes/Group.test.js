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

const friend= [{"nickname":"YBLee"}]
const leaderboard= {
    "leaderboard" : [
        {
        "id" : 1,
        "rank" : 1,
        "firstword" : "Y",
        "name" : "YBBB",
        "fever_time" : "00:05:00"
        }
    ],
    "time" : "2019/11/18 ~ 2019/11/24"
    }
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
        
        axios.get = jest.fn((url) => {
            if(url.indexOf("leaderboard") <0){
                return new Promise((resolve) => {
                    const result = {
                        status: 200,
                        data: friend
                    };
                    resolve(result);
                })
            }
            else{
                return new Promise((resolve) => {
                    const result = {
                        status: 200,
                        data: leaderboard
                    };
                    resolve(result);
                })
            }
            
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

    it("should click friends and confirm", (done)=>{
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
        done()
    })

    it("should click friends check and confirm", ()=>{
        const component = mount(group);
        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        newGroupInstance.setState({loadFriendSuccess : true, friendlist : [{'firstword' : "Y", 'name':"YBLee"}] })
        expect(newGroupInstance.state.loadFriendSuccess).toBe(true);
        expect(newGroupInstance.state.friendlist).toStrictEqual([{'firstword' : "Y", 'name':"YBLee"}]);

        const add_button = component.find("#AddMemberButton")
        add_button.simulate("click")
        const check = component.find("#friendcheckbox")
        check.simulate("click")
        expect(newGroupInstance.state.FriendNames).toStrictEqual(["YBLee"]);

        component.find("#confirmAddMember").at(1).simulate("click")

        expect(axios.post).toHaveBeenCalledTimes(1);
    })

    it("should click friends check and confirm reject 404", ()=>{
        axios.post = jest.fn(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    response: {status:401}
                };
                reject(result);
            })
        })
        const component = mount(group);
        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        newGroupInstance.setState({loadFriendSuccess : true, friendlist : [{'firstword' : "Y", 'name':"YBLee"}] })
        expect(newGroupInstance.state.loadFriendSuccess).toBe(true);
        expect(newGroupInstance.state.friendlist).toStrictEqual([{'firstword' : "Y", 'name':"YBLee"}]);

        const add_button = component.find("#AddMemberButton")
        add_button.simulate("click")
        const check = component.find("#friendcheckbox")
        check.simulate("click")
        expect(newGroupInstance.state.FriendNames).toStrictEqual(["YBLee"]);

        component.find("#confirmAddMember").at(1).simulate("click")

        expect(axios.post).toHaveBeenCalledTimes(1);

    })

    it("should write to tag", ()=>{
        const component = mount(group);
        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        const search_button = component.find("#search_button")
        search_button.simulate("click")
        expect(newGroupInstance.state.fever_tag).toStrictEqual("All");

        const tag_input = component.find("#Tag_input")
        tag_input.simulate('change', { target: { value: "test" } });
        search_button.simulate("click")
        expect(newGroupInstance.state.search_input).toStrictEqual("test");
        expect(newGroupInstance.state.fever_tag).toStrictEqual("test");
        
    })

    it("should change range", ()=>{
        const component = mount(group);
        const newGroupInstance = component.find(Group.WrappedComponent).instance();
        const prev_month = component.find("#prev_month")
        const prev_week = component.find("#prev_week")
        const next_week = component.find("#next_week")
        const next_month = component.find("#next_month")

        next_month.simulate("click")
        expect(newGroupInstance.state.week_delta).toBe(0);
        prev_week.simulate("click")
        expect(newGroupInstance.state.week_delta).toBe(1);
        next_month.simulate("click")
        expect(newGroupInstance.state.week_delta).toBe(0);
        prev_month.simulate("click")
        expect(newGroupInstance.state.week_delta).toBe(4);
        next_week.simulate("click")
        expect(newGroupInstance.state.week_delta).toBe(3);
        prev_week.simulate("click")
        next_month.simulate("click")
        expect(newGroupInstance.state.week_delta).toBe(0);
    })

})

