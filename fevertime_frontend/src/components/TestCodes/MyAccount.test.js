import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MyAccount from '../MyAccount';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import * as loginAction from '../../store/actions/login';

const stubLoginInitState= {
    uid:1,
    username:"asdf",
    nickname:"asdf",
};

const mockStore = getMockStore(stubLoginInitState,{});


describe('MyAccount', () => {
    let myaccount;
    let spyhistoryPush
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
        loginAction.ChangeMyAccount = jest.fn(()=>{return ()=>{}});
        window.alert = jest.fn(()=>{return ()=>{}});
        spyhistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(() => { return path => {}; });

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
        expect(newmyaccount.state.WrongInput).toEqual(["","",""]);
        expect(loginAction.ChangeMyAccount).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(spyhistoryPush).toHaveBeenCalledTimes(1);
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
        expect(loginAction.ChangeMyAccount).toHaveBeenCalledTimes(0);
        expect(window.alert).toHaveBeenCalledTimes(0);
    }); 


});