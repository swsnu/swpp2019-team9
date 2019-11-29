import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Signup from '../Signup';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import axios from "axios"

const stubInitialUser = {
    uid:0,
    username: '',
    nickname:'',
}
const mockStore = getMockStore(stubInitialUser,{});

describe('Signup', () => {
    let signup;
    let ID = "ValidID"
    let Nickname = "Nick"
    let Password = "1234"
    let Password_C = "1234"

    beforeEach(() => {
        signup = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Signup/>
                </ConnectedRouter>
            </Provider>
        );
    })
    afterEach(() => { jest.clearAllMocks() });

    it('should render', () => {
        const component = mount(signup);
        expect(component.find('.Signup').length).toBe(1);
    });

    it("should take check Valid inputs", (done) => { 
        axios.post = jest.fn(() => {
            return new Promise((resolve,) => {
              const result = {
                status: 201,
                data: {}
              };
              resolve(result);
            })})
        const component = mount(signup);
        const ID_input = component.find('#ID_input');
        const pw_input = component.find('#Password_input')
        const nickname_input = component.find('#Nickname_input')
        const pwc_input = component.find('#Password_Confirm_input')
        ID_input.simulate('change', { target: { value: ID } });
        pw_input.simulate('change', { target: { value: Password } });
        nickname_input.simulate('change', { target: { value: Nickname } });
        pwc_input.simulate('change', { target: { value: Password_C } });
        component.find('#Term_Use_button').simulate('change');
        component.find('#Term_Personal_button').simulate('change');

        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput).toEqual(["","","","","",""]);
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
    }); 
    
    it("should take check Invalid inputs", () => {      
        axios.post = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    response: {status:401, data: {"ID" : "Empty ID", "nickname" : "Empty Nickname"}},
                };
                reject(result)
                resolve()
            })
        });
        const component = mount(signup);
        const ID_input = component.find('#ID_input');
        const pw_input = component.find('#Password_input')
        const nickname_input = component.find('#Nickname_input')
        const pwc_input = component.find('#Password_Confirm_input')
        ID_input.simulate('change', { target: { value: "" } });
        pw_input.simulate('change', { target: { value: "" } });
        nickname_input.simulate('change', { target: { value: "" } });
        pwc_input.simulate('change', { target: { value: Password_C } });

        component.find("#Signup_button").simulate("click");
        expect(axios.post).toHaveBeenCalledTimes(1);        
    });    

    it("should long nickname", (done) => {      
        axios.post = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    response: {status:400,},
                };
                reject(result)
                resolve()
            })
        });
        const component = mount(signup);
        const ID_input = component.find('#ID_input');
        ID_input.simulate('change', { target: { value: "asdf" } });
        const nickname_input = component.find('#Nickname_input')
        nickname_input.simulate('change', { target: { value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" } });

        component.find("#Signup_button").simulate("click");
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
    });

});