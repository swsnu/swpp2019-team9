import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Signup from '../Signup';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import axios from "axios"

const mockStore = getMockStore({},{});

axios.post = jest.fn(() => {
    return new Promise((resolve,) => {
      const result = {
        status: 201,
        data: {}
      };
      resolve(result);
    })})

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
    
    it("should take check Invalid inputs", (done) => {      
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
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput).toEqual(["Empty ID","Empty Nickname","Empty Password","Wrong Password Confirm","Please Check","Please Check"]);
        expect(axios.post).toHaveBeenCalledTimes(0);
        done();
    });    


});