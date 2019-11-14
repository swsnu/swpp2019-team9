import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MyAccount from '../MyAccount';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import * as loginAction from '../../store/actions/login';
import axios from 'axios';

const stubLoginInitState= {
    uid:1,
    username:"asdf",
    nickname:"asdf",
};

const mockStore = getMockStore(stubLoginInitState,{});

jest.mock('../component/PopupMessage', () => {
    return jest.fn((props) => {
      return (
        <div className="spyPopupMessage">
            <button id="spyExit" onClick={props.clickClose}/>
        </div>
        );
    });
});


describe('MyAccount', () => {
    let myaccount;
    let Nickname = "Nick"
    let Password = "1234"
    let Password_C = "1234"

    beforeEach(() => {
        myaccount = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <MyAccount/>
                </ConnectedRouter>
            </Provider>
        );
        loginAction.changeMyAccount = jest.fn(() =>() => {
            return new Promise((resolve) => {resolve({})})
        });

    })
    
    afterEach(()=> {jest.clearAllMocks()});

    it('should render', () => {
        const component = mount(myaccount);
        expect(component.find('.MyAccount').length).toBe(1);
    });

    it("should check Valid inputs", () => { 
        const component = mount(myaccount);
        const pw_input = component.find('#password_input')
        const nickname_input = component.find('#nickname_input')
        const pwc_input = component.find('#password_confirm_input')
        nickname_input.simulate('change', { target: { value: Nickname } });
        pw_input.simulate('change', { target: { value: Password } });
        pwc_input.simulate('change', { target: { value: Password_C } });

        component.find("#confirm_button").simulate("click");
        const newmyaccount = component.find(MyAccount.WrappedComponent).instance();
        component.find("#spyExit").at(0).simulate("click");
        expect(newmyaccount.state.showSigninPopup).toEqual(true)
        component.find("#spyExit").at(1).simulate("click");
        expect(newmyaccount.state.showErrorPopup).toEqual(false)
    }); 

    it("should toggle", () => { 
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                };
                resolve(result);
            })
        });
        const component = mount(myaccount);
        component.find("#toggle-button").simulate("click");
        expect(axios.get).toHaveBeenCalledTimes(1)
    }); 

    it("should check Invalid nickname", () => { 
        const component = mount(myaccount);
        const pw_input = component.find('#password_input')
        const nickname_input = component.find('#nickname_input')
        const pwc_input = component.find('#password_confirm_input')
        nickname_input.simulate('change', { target: { value: "" } });
        pw_input.simulate('change', { target: { value: "" } });
        pwc_input.simulate('change', { target: { value: "asd" } });

        component.find("#confirm_button").simulate("click");
        const newmyaccount = component.find(MyAccount.WrappedComponent).instance();
        expect(newmyaccount.state.WrongInput).toEqual(["Empty Nickname","Empty Password","Wrong Password Confirm"]);
        expect(loginAction.changeMyAccount).toHaveBeenCalledTimes(0);
    }); 


});